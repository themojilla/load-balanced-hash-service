import { HashAlgorithm } from '../services/hash/types.js';

export interface HashRequest {
  text: string;
  algorithm?: HashAlgorithm;
}

export interface HashResponse {
  original: string;
  algorithm: HashAlgorithm;
  hash: string;
  processingTimeMs: number;
}

export interface ServerInfo {
  serverId: string;
  port: string | number;
  supportedAlgorithms: HashAlgorithm[];
}
