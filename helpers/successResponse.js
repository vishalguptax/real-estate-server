class SuccessResponse {
    static ok(res, message, data = {}) {
      return res.status(200).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static created(res, message, data = {}) {
      return res.status(201).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static noContent(res, message) {
      return res.status(204).json({
        status: 'success',
        message,
      });
    }
  
    static accepted(res, message, data = {}) {
      return res.status(202).json({
        status: 'success',
        message,
        data,
      });
    }
  }
  
export default SuccessResponse;
  