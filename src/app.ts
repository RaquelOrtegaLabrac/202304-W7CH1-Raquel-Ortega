import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { dataRouter } from './router.js';
import { errorHandler } from './middleware/error.js';

const debug = createDebug('W6:App');

export const app = express();

debug('Loaded Express');
const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_req, _res, next) => {
  debug('Soy un middleware');
  next();
});

app.get('/', (request, response) => {
  response.send('Hello Express!');
});

app.use('/data', dataRouter);

app.use(errorHandler);
