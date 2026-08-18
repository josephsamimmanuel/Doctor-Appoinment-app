import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.middleware.js';
import { rateLimitMiddleware } from './middlewares/rateLimit.middleware.js';
import apiRoutes from './routes/index.js';

const app: Express = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(corsMiddleware);
app.use(morgan(env.isProduction ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitMiddleware);

app.use('/api/v1', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
