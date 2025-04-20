import autocannon from 'autocannon';
import { pino } from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

async function runHighConcurrencyTest() {
  logger.info('Starting High Concurrency Test');

  const result = await autocannon({
    url: 'http://localhost:8080/api/hash',
    connections: 100, // 100 concurrent connections
    duration: 30, // 30 seconds
    pipelining: 4, // 4 requests in pipeline
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'High concurrency test',
      algorithm: 'sha256',
    }),
  });

  logger.info(
    {
      test: 'High Concurrency',
      metrics: {
        requestsPerSec: result.requests.average,
        avgLatency: result.latency.average,
        p99Latency: result.latency.p99,
        totalRequests: result.requests.total,
        errorRate:
          ((result.errors / result.requests.total) * 100).toFixed(2) + '%',
      },
    },
    'Test completed'
  );
}

runHighConcurrencyTest().catch((error) => {
  logger.error(error, 'Test failed');
  process.exit(1);
});
