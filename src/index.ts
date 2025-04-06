import express from 'express';
import { logger } from './utils/logger.js';
import { SERVER_CONFIG } from './config/server.config.js';
import hashRoutes from './api/routes/hash.js';
import infoRoutes from './api/routes/info.js';
import healthRoutes from './api/routes/health.js';
import { errorHandler } from './api/middleware/error.js';

const app = express();

app.use(express.json());

app.use('/api', hashRoutes);
app.use('/api', infoRoutes);
app.use('/', healthRoutes);

app.use(errorHandler);

const SERVER_ID = process.env.SERVER_ID || SERVER_CONFIG.defaultServerId;
const PORT = parseInt(
  process.env.PORT || SERVER_CONFIG.defaultPort.toString(),
  10
);

app.listen(PORT, () => {
  logger.info(`Hash server ${SERVER_ID} started on port ${PORT}`);
});

process.on('SIGINT', () => {
  logger.info(`Server ${SERVER_ID} shutting down`);
  process.exit(0);
});
