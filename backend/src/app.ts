// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/duty.routes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/duties', router);
app.use(errorHandler);

export default app;
