import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import router from './routers/contacts.js';

dotenv.config();

const setupServer = () => {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.get('/', (req, res) => {
    res.send('Home page');
  });

  app.use(router);

  const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  };

  app.use('*', notFoundHandler);

  const errorHandler = (err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  };

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
