
import { Router } from "express"
import { Room } from "../../db/index.js";
import { User } from "../../db/index.js";
// import jwt, { decode } from 'jsonwebtoken';

import dotenv from "dotenv";

dotenv.config();

export const room=Router();


//to create the room after the login 
room.post("",async(req,res)=>{


    try {

        const {name,type,theme,createdBy,users,assests}=req.body;

        const newroom=new Room({name,type,theme,createdBy,users,assests});
        newroom.save();      
        res.status(200).json({

            message:"room added sucessfully"

        })
    } catch (error) {

        res.status(400).json({
            message:"room not added"
        })
        
        
    }
})

//to get the room details
room.get("",async(req,res)=>{

    try {

        const userid=req.userid;
    
             
        const rooms = await Room.find({users:userid});

        if(rooms.length===0){

            res.status(202).json({
                message:"No Rooms left"
            })
            
        }
        
        res.status(200).json({rooms})       
    } catch (error) {
        
        console.log(error);
        
    }

})



//to get the fetch the room details when you entered into the room
room.get("/:id",async(req,res)=>{

    const id=req.params.id;

    const room= await Room.findById(id);

    res.status(200).json({
        
        room

    })
})


room.post("/delete",async(req,res)=>{

    
    const {roomId}=req.body;

    console.log(roomId);
    

    try{

        await Room.findByIdAndDelete(roomId);

        
            res.status(200).json({
                message:"Deleted sucessfully"
    
            })
        

    }
    catch(e){
        console.log(error);
    }
    
})


room.post("/join",async(req,res)=>{


    const {roomId,userId}=req.body;

    if(!roomId||!userId){

        res.status(300).json({
            message:"please enter the user id and room id "
        })
    }

    try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $addToSet: { users: userId } }, 
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(updatedRoom);
  } catch (err) {
    console.error('Error adding user to room:', err);
    res.status(500).json({ error: 'Server error' });
  }
})

room.post("/id/message",(req,res)=>{

    res.status(200).json({

        message:"message is borad casted"

    })
})

room.get("/id/exit",(req,res)=>{
    
    res.status(200).json({

        message:"exited sucessfully form the room"
    })
})