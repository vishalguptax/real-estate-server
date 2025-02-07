import jwt from "jsonwebtoken";
import ErrorResponse from "../helpers/errorResponse.js";

/**
 * verifyToken Middleware      - Validates the JWT token from cookies.
 * @param {Object} req         - Express request object
 * @param {Object} res         - Express response object
 * @param {Function} next      - Express next middleware function
 * @returns {void}             - Calls next() if token is valid, otherwise sends an error response
 */
export const verifyToken = (req, res, next) => 
{
  const token = req.cookies.token;

  if (!token) 
  {
    return next(ErrorResponse.unauthorized("Not Authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) 
    {
        return next(ErrorResponse.forbidden("Token is not Valid!"));
    }
    req.userId = payload.id;
    console.log(req.userId);
    next();
  });
};