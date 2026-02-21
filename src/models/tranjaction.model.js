import mongoose  from "mongoose";


const tranjactionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required:[true,"Tranjaction must be associated with an account"],
        index:true
     }, 
     toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Tranjaction must be associated with an account"],
        index:true
     },
     status:{
        type:String,
        enum: {
            values:["PENDING","COMPLETED","FAILED"],
            message:"Status must be either PENDING, COMPLETED, or FAILED",
        },
        default:"PENDING"
     },
     amount :{
        type:Number,
        required:[true,"Amount is required for a tranjaction"],
        min:[0.01,"Amount must be at least 0.01"]
        },
    
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required to prevent duplicate tranjactions"],
        unique:true
    }
},{ 
    timestamps:true
})