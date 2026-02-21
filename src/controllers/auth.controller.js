import userModel from "../models/user.models.js"; // import user model for database operations
import jwt from "jsonwebtoken"; // import jsonwebtoken for token generation
import bcrypt from "bcryptjs"; // import bcryptjs for password hashing and comparison
import mailer from "../utils/mailer.js"; // import mailer for sending emails

import dotenv from "dotenv"; // import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file


 const userRegisterController  = async (req,res) =>  {
    const {email,name,password} = req.body; // destructure email, name, and password from request body

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        // Create new user
        const newUser = await userModel.create({ 
            email:email.toLowerCase() ,
            name : name.toLowerCase(),
            password:password
        })
        
        // Jwt=> {header, payload, signature}
        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET, {expiresIn:"1h"}); // Generate JWT token for the new user

        // to save token in cookie
        res.cookie("token",token,{
            httpOnly:true, // stop to access token from browser 
            secure:true, // only send cookie over HTTPS
            sameSite: "strict" // prevent   CSRF  attacks by only sending cookie for same site requests
        }) 

       // send welcome email to the email address provided by the user during registration
       mailer.sendWelcomeEmail(newUser.email, newUser.name); 
      
        return res.status(201).json({ 
            user :{
                _id: newUser._id,
                email:newUser.email,
            },
            success:true,
            message:" User registered successfully"    
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error registering user",
            error:error.message
        })
    }
}

const userLoginController = async (req,res) => {
    const {email,password} = req.body; // destructure email and password from request body
    try {
        // Check if user exists
        const user = await userModel.findOne({email}); //
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }

        // Compare password 
        const isPasswordValid = await bcrypt.compare(password,user.password); // Compare the provided password with the hashed password in the database

        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        // Generate JWT token
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
        
        // to save token in cookie
        res.cookie("token",token,{
            httpOnly:true, // stop to access token from browser 
            secure:true, // only send cookie over HTTPS
            sameSite: "strict" // prevent   CSRF  attacks by only sending cookie for same site requests
        }) 
        return res.status(200).json({ 
            user :{
                _id: user._id,
                email:user.email,
                name:user.name
            },
            success:true,
            message:" User logged in successfully"    
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error logging in user",
            error:error.message
        })
    }
}




export default {
    userRegisterController,
    userLoginController,
   
}








