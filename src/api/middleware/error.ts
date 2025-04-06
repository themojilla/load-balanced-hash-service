import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    {
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    },
    'Request error'
  );

  res.status(500).json({
    error: 'An error occurred while processing the request',
    details: err.message,
  });
};
