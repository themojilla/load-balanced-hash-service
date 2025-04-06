import crypto from 'crypto';
import { performance } from 'node:perf_hooks';

export const hashMD5 = (text: string): { hash: string; duration: number } => {
  const startTime = performance.now();
  const hash = crypto.createHash('md5').update(text).digest('hex');
  const duration = performance.now() - startTime;

  return { hash, duration };
};
