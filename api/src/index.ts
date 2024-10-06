import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

const PORT = 3001;

const app = express();
const server = app;

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use(express.json());
    app.use(router);

    server.listen(PORT, () => {
      console.log(`Server is running in http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('erro'));
