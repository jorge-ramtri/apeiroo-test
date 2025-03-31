import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
