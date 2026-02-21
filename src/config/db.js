import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose'; // import mongoose for MongoDB connection


  const connectDB = async () => {
   
        await mongoose.connect(process.env.Base_url).then(()=>{
            console.log('Connected to MongoDB');
        } ).catch((err)=>{
            console.error('Error connecting to MongoDB:', err);
        });
        
}

export default connectDB;

