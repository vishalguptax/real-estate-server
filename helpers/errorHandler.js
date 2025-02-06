export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
};
  