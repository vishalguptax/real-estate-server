class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest(message) {
      return new ErrorResponse(message || 'Bad Request', 400);
    }
  
    static unauthorized(message) {
      return new ErrorResponse(message || 'Unauthorized', 401);
    }
  
    static forbidden(message) {
      return new ErrorResponse(message || 'Forbidden', 403);
    }
  
    static notFound(message) {
      return new ErrorResponse(message || 'Not Found', 404);
    }

    static conflict(message) {
      return new ErrorResponse(message || 'already exist', 409);
    }
  
  
    static internalServer(message) {
      return new ErrorResponse(message || 'Internal Server Error', 500);
    }
  }
  
export default ErrorResponse;
  