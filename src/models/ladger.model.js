import mongoose  from "mongoose";


const ledgerSchema = new mongoose.Schema({
    accountId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required:[true,"Ledger entry must be associated with an account"],
        index:true
     },
     amount:{
        type:Number,
        required:[true,"Amount is required for a ledger entry"],
        immutable:true // once the ledger entry is created, the amount cannot be changed 
     },

    tranjactionId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tranjaction",
    required:[true,"Ledger entry must be associated with a tranjaction"],
    index:true,
    immutable:true // once the ledger entry is created, the tranjactionId cannot be changed 
    }
},{
    timestamps:true
})