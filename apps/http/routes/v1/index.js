import {Router} from "express";
import {userRouter} from "../users/index.js"
import {room} from "../room/index.js"
import { files } from "../files/index.js";
import { ai } from "../ai/index.js";
import { User,Room,File,ChatMessage } from "../../db/index.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { protect } from "../../middleware/middleware.js";
import cors from "cors"


export const v1router=Router();
dotenv.config();


const generateToken=(userid)=>{

    return jwt.sign({userid},process.env.JWT_VALUE,{expiresIn:'1d'});
}

v1router.post("/signup",async(req,res)=>{

    try{


        const {username,email,password,createdAt}=req.body;

        const newUser=new User({username,email,password,createdAt});

        await newUser.save()

        res.status(200).json({
            message:"User is addded"
        })

    }
    catch(e){

        res.status(400).json({

            mesaage:"user already present or enter all the details"

        })
    }  
})

v1router.post("/signin",async(req,res)=>{
    

    try{

        const {email,password}=req.body;
        const user=await User.findOne({password})

        const userdata=await User.findById(user._id).select('-password');
       
        if(!user){
            res.status(200).json({
                message:"check wheater the password and username is correct or not"
            })
        }
        else{
            const token=generateToken(user._id)                 
            res.cookie('token',token,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
                maxAge:24*60*60*1000
            })
        
            res.json({
                message:"Login Sucessfull",
                userdata
            })
    }    
    }
    catch(e){

        console.log(e);
        
        res.status(400).json({
            message:"sign-in failed",
        })
    }
})
v1router.post("/logout",(req,res)=>{

    
    res.clearCookie('token');
    res.status(200).json({

        message:"logged out sucessfully"

    })
})

v1router.use("/user",protect,userRouter);
v1router.use("/room",protect,room);
v1router.use("/files",protect,files);
v1router.use("/ai",protect,ai);




