import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (payload) => {
  const isUser = await User.findOne({ email: payload.email });
  if (isUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};


export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};


export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};


export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();
  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({ userId: session.userId, ...newSession });
};

// token reset
export const requestResetToken = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const resetPasswordTemplatePath = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;

    const template = handlebars.compile(`<p>Click <a href="${resetPasswordTemplatePath}">here</a> to reset your password!</p>`);
    const html = template({
      name: user.name,
    });

    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',
      html,
    });

    return resetToken;
  } catch (error) {
    console.error('Error sending email:', error);
    throw createHttpError(500, 'Failed to send the email, please try again later.', error);
  }
};

// pwd reset
export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, process.env.JWT_SECRET);
      } catch (err) {

    if (err instanceof Error) throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
