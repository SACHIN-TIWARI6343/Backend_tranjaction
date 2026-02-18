import userModel from "../models/user.models.js"; // import user model for database operations
import jwt from "jsonwebtoken"; // import jsonwebtoken for token generation

 const userRegisterController  = async (req,res)=>{
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
            email,
            name,
            password
        })
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:newUser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error registering user",
            error:error.message
        })
    }

    const token = jwt.sign(); // Generate JWT token for the new user

}

export default {
    userRegisterController
}








