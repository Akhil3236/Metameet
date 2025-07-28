import { Router } from "express";



export const files=Router();



files.post("/upload",(req,res)=>{

    res.status(200).json({

        message:"File uplaoded sucessfully"

    })
})

files.get("/:id",(req,res)=>{

    res.status(200).json({

        message:"view or download the file"

    })
})

files.delete("/delete",(req,res)=>{

    res.status(200).json({

        message:"the file is deleted"

    })
})