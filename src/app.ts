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
  if (error.response) {
    return res.sendStatus(error.response.status);
  }
  return res.sendStatus(500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
