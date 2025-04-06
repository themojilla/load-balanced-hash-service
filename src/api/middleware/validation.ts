import { Request, Response, NextFunction } from 'express';
import type { HashAlgorithm } from '../../services/hash/types.js';

export const validateHashRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { text, algorithm } = req.body;

  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  const validAlgorithms: HashAlgorithm[] = ['md5', 'sha256', 'argon2'];
  if (algorithm && !validAlgorithms.includes(algorithm as HashAlgorithm)) {
    res.status(400).json({
      error: `Invalid algorithm. Must be one of: ${validAlgorithms.join(', ')}`,
    });
    return;
  }

  next();
};
