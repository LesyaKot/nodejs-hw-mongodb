import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use(pino());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send('Home page');
  });

  app.use('/', router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
