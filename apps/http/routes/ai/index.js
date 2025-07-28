import { Router } from "express";


export const ai=Router();


ai.post("/summarize",(req,res)=>{

    res.status(200).json({

        message:"Summirize this efficently"

    })
})

ai.post("/ask",(req,res)=>{

    res.status(200).json({

        message:"ASK the gpt "
    })
})