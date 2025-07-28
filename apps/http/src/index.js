import express from "express";
import { v1router } from "../routes/v1/index.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"


import cookieParser from 'cookie-parser';


const app=express();
dotenv.config();
app.use(cookieParser());     
app.use(express.json());

const allowed=[

    "https://www.metameet.digital",
    'http://localhost:5173',
    '*'
];
app.use(cors({
  origin: allowed,
  credentials: true ,           
}));


const port=process.env.port|| 3000;


mongoose.connect(process.env.DB_url)
.then(()=>{

    console.log("connected");
    
})
.catch((e)=>{


    console.log(e);
    
    console.log("not connected");
})


app.use("/api/v1",v1router)

app.listen(port,()=>{

    console.log("the server is listning at the port :"+port)
})

