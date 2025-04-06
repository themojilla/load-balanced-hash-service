import argon2 from 'argon2';
import { performance } from 'node:perf_hooks';
import { HASH_CONFIG } from '../../config/hash.config.js';

export const hashArgon2 = async (
  text: string
): Promise<{ hash: string; duration: number }> => {
  const startTime = performance.now();

  const hash = await argon2.hash(text, {
    type: argon2.argon2id,
    timeCost: HASH_CONFIG.argon2.timeCost,
    memoryCost: HASH_CONFIG.argon2.memoryCost,
    parallelism: HASH_CONFIG.argon2.parallelism,
  });

  const duration = performance.now() - startTime;

  return { hash, duration };
};
