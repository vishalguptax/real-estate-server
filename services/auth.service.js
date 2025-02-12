import { compare, hash } from "bcrypt";
import {prisma} from "../prisma/index.js";
import ErrorResponse from "../helpers/errorResponse.js";
import jwt from "jsonwebtoken";

/**
 * registerUserService      - It generates a new user.
 * @param {String} username - Username of the user
 * @param {String} email    - Email of the user
 * @param {String} password - Password of the user
 * @returns {Object} user   - Returns the user object
 */
export const registerUserService = async ({username, email, password }) => 
{
      // Check if the username already exists
      const existingUser  = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser ) {
        throw ErrorResponse.conflict("Username already exists");
        }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
        data: 
        {
            username,
            email,
            password: hashedPassword
        }
    })
    return user;
}

/**
 * loginUserService           - Authenticates a user and generates a JWT token.
 * @param {String} username   - Username of the user
 * @param {String} password   - Password of the user
 * @returns {Object}          - Returns an object containing user info and a JWT token
 * @returns {ErrorResponse}    - Returns an error if credentials are invalid or missing
 */
export const loginUserService = async (username, password, next) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return next(ErrorResponse.notFound("User not found"));
  }

  const isPasswordValid = await compare(password, user.password); 

  if (!isPasswordValid) {
    return next(ErrorResponse.unauthorized("Invalid Credentials!"));
  }

  const age = 1000 * 60 * 60 * 24 * 7;  
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: false,
    },
    process.env.JWT_SECRET_KEY,  
    { expiresIn: age }
  );

  const { password: userPassword, ...userInfo } = user;

  return {
    userInfo, 
    token, 
  };
};
