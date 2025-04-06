export class HashingError extends Error {
  constructor(
    message: string,
    public algorithm: string
  ) {
    super(message);
    this.name = 'HashingError';
  }
}
