import Address from "../models/address.model.js";
import { authUser } from "../middlewares/authUser.js";

//add address :/api/address/add

export const addAddress=async(req,res)=>{
    try {
        const userId=req.user;
        const{address}=req.body;
        await Address.create({
            ...address,
            userId,
        });
        res.status(201).json({message:"Address added successfully",success:true});
        
    } catch (error) {
        console.error("error adding address",error);
        res.status(500).json({message:"Internal server error"});
        
    }
};

//get address :/api/address/get

export const getAddress=async(req,res)=>{
    const userId=req.user;
    try {
        const addresses=await Address.find({userId}).sort({createdAt:-1});
        res.status(201).json({success:true,addresses});
    } catch (error) {
        console.error("error adding address",error);
        res.status(500).json({message:"Internal server error"});
    }
}