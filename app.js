// Modules Imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// SEC Local Impports
// Router Imports
import userRouter from './routers/userRouter.js';
import producRouter from './routers/productRouter.js';
import authRouter from './routers/authRouter.js';
import cartRouter from './routers/cartRouter.js';

// Controllers Imports
import globalErrorHandler from './controllers/errorController.js';

// Utils Imports
import AppError from './utils/appError.js';

const app = express();

// Body Parser
app.use(express.json());
app.use(cookieParser());
// CORS Handller
app.use(
  cors({
    origin: '*', // Replace with your frontend's actual origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to allow cookies to be sent with the request
  }),
);

// Logging Request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', producRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cart', cartRouter);

// Not Found Router
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
