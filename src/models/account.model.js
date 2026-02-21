import mongoose  from "mongoose";


const accountSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true
     }, 
     status:{
        type:String,
        enum: {
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status must be either ACTIVE, FROZEN, or CLOSED",
        }
     },
     currency :{
        type:String,
        required:[true,"Currency is required"],
        default:"INR"
     }

    },{

    timestamps:true
})
// compound index
accountSchema.index({userId:1,status:1}); // unique index to ensure one active account per user

const accountModel = mongoose.model('Account',accountSchema);

export default accountModel;