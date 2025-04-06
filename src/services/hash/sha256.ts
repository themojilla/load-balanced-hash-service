import crypto from 'crypto';
import { performance } from 'node:perf_hooks';

export const hashSHA256 = (
  text: string
): { hash: string; duration: number } => {
  const startTime = performance.now();
  const hash = crypto.createHash('sha256').update(text).digest('hex');
  const duration = performance.now() - startTime;

  return { hash, duration };
};
