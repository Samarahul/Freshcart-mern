import User from '../models/User.model.js';

//update and cart data:/api/cart/update

export const updateCart=async(req,res)=>{
    try{
        const userId=req.user;
        const {cartItems}=req.body;
        const updatedUser=await User.findByIdAndUpdate(userId,{cartItems},{new:true});
        if(!updatedUser){
            return res.status(404).json({message:"User Not Found",success:false});
        }
        res.status(201).json({updatedUser,success:true,message:"cart updated Successfully"});
    }
    catch(e){
        res.status(500).json({message:"server error",error:error.message});

    }
};