import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

const PORT = 3000;

const app = express();
const server = app;

mongoose
  .connect(
    'mongodb://mongo:61efee0c9edc7939be31@achieve-it_db-achieve-it:27017'
  )
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
