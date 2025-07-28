import { Router } from "express";
import { User,Room,File,ChatMessage } from "../../db/index.js";
import { protect } from "../../middleware/middleware.js";


export const userRouter=Router();


userRouter.get("/me",protect,async(req,res)=>{

    const checkuser=await User.findById(req.userid).select('-password');

    
    res.json({checkuser})

    
})

userRouter.patch("/me",(req,res)=>{

    res.status(200).json({
        message:"user is deleted"
    })
})

