import express, { Request, Response } from 'express';
import { SERVER_CONFIG } from '../../config/server.config.js';
import { ServerInfo } from '../types.js';

const router = express.Router();

router.get('/info', (req: Request, res: Response) => {
  const serverInfo: ServerInfo = {
    serverId: process.env.SERVER_ID || SERVER_CONFIG.defaultServerId,
    port: process.env.PORT || SERVER_CONFIG.defaultPort,
    supportedAlgorithms: ['md5', 'sha256', 'argon2'],
  };

  res.status(200).json(serverInfo);
});

export default router;
