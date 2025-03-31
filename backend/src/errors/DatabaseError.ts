import { BaseError } from './BaseError';

export class DatabaseError extends BaseError {
  constructor(message = 'Database error occurred') {
    super(message, 500);
  }
}
