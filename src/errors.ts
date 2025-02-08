export class AppError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode: number = 500,
      public readonly details?: any,
      public readonly originalError?: Error
    ) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Specific error types
  export class DatabaseError extends AppError {
    constructor(message: string, originalError?: Error) {
      super(`Database error: ${message}`, 500, undefined, originalError);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(resource: string, id?: string) {
      super(
        id ? `${resource} with ID ${id} not found` : `${resource} not found`,
        404
      );
    }
  }
  
  export class ValidationError extends AppError {
    constructor(field: string, message: string) {
      super(`Validation failed for ${field}`, 400, { field, message });
    }
  }