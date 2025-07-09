class InternalServerError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

export default InternalServerError; 