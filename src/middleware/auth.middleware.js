import userModel from "../models/user.models.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";




const authMiddleware = (req,res,next) =>   {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get the token from cookies or headers
    if(! token){
        return res.status(401).json(
            {
                sucess:false,
                message:"No token provided, autherized access denied"
            }
        )

    }
    // verify token 
    try{
       const decoded = jwt.verify(token,process.env.JWT_SECRET); // Verify the token using the secret key
       const user = userModel.findById(decoded.userId)// Find the user by ID
       
       req.user = user;
       next(); // call the next middleware 
    }catch(error)
    {
        return 
    }

}

export default authMiddleware;