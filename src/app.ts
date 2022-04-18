/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, {
  json, NextFunction, Request, Response,
} from 'express';
import 'express-async-errors';
import router from './routers/index.js';

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.type === 'validation error') {
    return res.status(401).send(error.message);
  }
  if (error.type === 'not found') {
    return res.status(404).send(error.message);
  }
  if (error.type === 'duplicate value') {
    return res.status(409).send(error.message);
  }
  if (error.type === 'schema validate') {
    return res.status(400).send(error.message);
  }
  if (error.type === 'declined') {
    return res.status(405).send(error.message);
  }

  console.log(error);
  return res.sendStatus(500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
