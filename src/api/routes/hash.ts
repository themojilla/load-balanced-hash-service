import express, { Request, Response } from 'express';
import { hashText, HashAlgorithm } from '../../services/hash/index.js';
import { validateHashRequest } from '../middleware/validation.js';
import { logger } from '../../utils/logger.js';
import { HashRequest, HashResponse } from '../types.js';

const router = express.Router();

router.post(
  '/hash',
  validateHashRequest,
  async (req: Request, res: Response) => {
    try {
      const { text, algorithm = 'sha256' } = req.body as HashRequest;

      const result = await hashText(text, algorithm as HashAlgorithm);

      logger.info(
        `Hashed text using ${algorithm} in ${result.duration.toFixed(2)}ms`
      );

      const response: HashResponse = {
        original: text,
        algorithm: result.algorithm,
        hash: result.hash,
        processingTimeMs: parseFloat(result.duration.toFixed(2)),
      };

      res.status(200).json(response);
    } catch (error) {
      logger.error(error, 'Error hashing text');
      res.status(500).json({
        error: 'An error occurred while hashing the text',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

export default router;
