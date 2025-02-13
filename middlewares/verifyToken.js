import jwt from "jsonwebtoken";
import ErrorResponse from "../helpers/errorResponse.js";

/**
 * verifyToken Middleware      - Validates the JWT token from cookies.
 * @param {Object} req         - Express request object
 * @param {Object} res         - Express response object
 * @param {Function} next      - Express next middleware function
 * @returns {void}             - Calls next() if token is valid, otherwise sends an error response
 */
export const verifyToken = (req, res, next) => {
  console.log("🔍 Checking for token in cookies:", req.cookies);

  const token = req.cookies.token;
  // console.log(token)
  if (!token) {
    console.log("❌ No token found!");
    return next(ErrorResponse.unauthorized("Not Authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      console.log("❌ Token verification failed:", err);
      return next(ErrorResponse.forbidden("Token is not Valid!"));
    }
    
    req.userId = payload.id;  // Ensure the payload contains `id`
    console.log("✅ Token verified! User ID:", req.userId);

    next();
  });
};
