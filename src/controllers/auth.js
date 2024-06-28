import { registerUser } from '../services/auth.js';

import { loginUser } from '../services/auth.js';

import { ONE_DAY } from '../constants/index.js';


export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};


// export const loginUserController = async (req, res, next) => {
//   try {
//     const user = await loginUser(req.body);
//     res.json({
//       status: 200,
//       message: 'Successfully logged in',
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
