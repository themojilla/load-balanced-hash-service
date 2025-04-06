export type HashAlgorithm = 'md5' | 'sha256' | 'argon2';

export interface HashResult {
  hash: string;
  algorithm: HashAlgorithm;
  duration: number;
}
