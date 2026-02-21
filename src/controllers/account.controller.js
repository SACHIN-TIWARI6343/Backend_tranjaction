import accountModel from "../models/account.model.js";



const createAccountController = async (req,res) => {
    const {userId,status,currency} = req.body;
    try {
        const newAccount = await accountModel.create({
            userId:userId,
            status:status,
            currency:currency
        })
        return res.status(201).json({
            account:newAccount,
            success:true,
            message:"Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error creating account",
            error:error.message
        })
    }
}

export default {
    createAccountController,
}