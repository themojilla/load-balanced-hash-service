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

async function runStressTest() {
  logger.info('Starting Stress Test');

  const connectionSteps = [50, 100, 200, 400, 800, 1000];
  const results = [];

  for (const connections of connectionSteps) {
    logger.info(`Testing with ${connections} connections`);

    const result = await autocannon({
      url: 'http://localhost:8080/api/hash',
      connections,
      duration: 20,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `Stress test with ${connections} connections`,
        algorithm: 'sha256',
      }),
    });

    const metrics = {
      connections,
      requestsPerSec: result.requests.average,
      latency: result.latency.average,
      errors: result.errors,
      errorRate:
        ((result.errors / result.requests.total) * 100).toFixed(2) + '%',
      timeouts: result.timeouts,
    };

    results.push(metrics);

    logger.info(metrics, `Completed test with ${connections} connections`);

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  logger.info({ results }, 'Stress Test Summary');
}

runStressTest().catch((error) => {
  logger.error(error, 'Test failed');
  process.exit(1);
});
