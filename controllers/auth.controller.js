import ErrorResponse from "../helpers/errorResponse.js";
import SuccessResponse from "../helpers/successResponse.js";
import { loginUserService, registerUserService } from "../services/auth.service.js";

/**
 * register                   - It calls the registerUserService to register a new user.
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */
export const register = async (req, res, next) => 
{
    const { username, email, password } = req.body;
    if(!username || !password || !email)
    {
        return next(ErrorResponse.notFound("Please enter email and password")); 
    }
    try 
    {
        const user = await registerUserService({ username, email, password, next });
        return SuccessResponse.created(res, "User created successfully", user);
    } 
    catch (error) 
    {
        console.error(error);
        return next(ErrorResponse.internalServer("Internal Server Error"));  
    }
}

/**
 * login                    - It calls the loginUserService to login a user.
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */
export const login = async (req, res, next) => 
{
    try 
    {
      const { username, password } = req.body;
      if(!username || !password)
      {
        return next(ErrorResponse.notFound("Please enter username and password"));
      }
      const { userInfo, token } = await loginUserService(username, password, next);
      const age = 1000 * 60 * 60 * 24 * 7;
      res.cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
    } 
    catch (error) 
    {
      console.error(error);
      return next(ErrorResponse.internalServer("Internal Server Error"));  
    }
}

/**
 * logout Controller          - Logs out the user by clearing the authentication cookie.
 * @param {Object} req        - Express request object
 * @param {Object} res        - Express response object
 * @returns {Object}          - JSON response with a success message
 */
export const logout = async (req, res, next) => 
{
  try 
  {
    return res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
  } 
  catch (error) 
  {
    console.error(error);
    return next(ErrorResponse.internalServer("Internal Server Error")); 
  }
}