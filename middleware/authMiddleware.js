import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to protect routes by verifying the JWT token
export const requireSignIn = async (req, res, next) => {
    try {
      // Ensure token is prefixed with 'Bearer'
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Token not provided or invalid format',
        });
      }
  
      // Extract token (after 'Bearer ')
      const token = authHeader.split(' ')[1];
  
      const decode = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  };
  

// Middleware to check if the user has admin privileges
export const isAdmin = async (req, res, next) => {
    try {
      // Fetch the user from the database using the _id from the decoded token
      const user = await userModel.findById(req.user._id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
     
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };