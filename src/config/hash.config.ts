export const HASH_CONFIG = {
  argon2: {
    timeCost: 3,
    memoryCost: 4096,
    parallelism: 1,
    type: 'argon2id' as const,
  },
};
