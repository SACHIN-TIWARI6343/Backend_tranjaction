import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is required to create a user '],
        trim:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'],
        unique:true
    },
    name:{
        type:String,
        required:[true,'Name is required to create a user '],
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,    
        required:[true,'Password is required to create a user '],
        trim:true,
        lowercase:true,
        minlegth:[6,'Password must be at least 6 characters long'],
        select:false,

    }
    
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }   

    this.password = await bcrypt.hash(this.password,10);
    next();
   
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}


const userModel = mongoose.model('User',userSchema);

export default userModel;