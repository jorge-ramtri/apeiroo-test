// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/duty.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler);

export default app;
