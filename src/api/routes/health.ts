import express, { Request, Response } from 'express';
import { logger } from '../../utils/logger.js';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  logger.info(`Instance ${process.env.SERVER_ID} is health`);
  res.status(200).json({ status: 'healthy' });
});

export default router;
