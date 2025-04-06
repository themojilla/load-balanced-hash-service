import { hashMD5 } from './md5.js';
import { hashSHA256 } from './sha256.js';
import { hashArgon2 } from './argon2.js';
import { logger } from '../../utils/logger.js';
import { HashAlgorithm, HashResult } from './types.js';

export const hashText = async (
  text: string,
  algorithm: HashAlgorithm
): Promise<HashResult> => {
  logger.info(`Hashing text using ${algorithm}`);

  try {
    switch (algorithm) {
      case 'md5': {
        const result = hashMD5(text);
        return {
          hash: result.hash,
          algorithm: 'md5',
          duration: result.duration,
        };
      }
      case 'sha256': {
        const result = hashSHA256(text);
        return {
          hash: result.hash,
          algorithm: 'sha256',
          duration: result.duration,
        };
      }
      case 'argon2': {
        const result = await hashArgon2(text);
        return {
          hash: result.hash,
          algorithm: 'argon2',
          duration: result.duration,
        };
      }
      default:
        throw new Error(`Unsupported hash algorithm: ${algorithm}`);
    }
  } catch (error) {
    logger.error({ algorithm, error }, 'Error while hashing text');
    throw error;
  }
};
