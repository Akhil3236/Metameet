import express from "express"
import cors from "cors"
import {Server} from "socket.io"
import http from  "http"


const app=express();
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{

        origin:'*',
        methods:["GET","POST"]
    }
});



const rooms={}
const WIDTH = 11000;
const HEIGHT = 6000;
const movementBounds = {
  minX: -2100,
  maxX: 2080,
  minY: -1080,
  maxY: 1020
};


io.on("connection",(Socket)=>{

    console.log("soketid",Socket.id);
    
    Socket.emit("socketdata",Socket.id);
    
    Socket.on("join_room",({username,roomid,avtar})=>{


       Socket.join(roomid);
       if (!rooms[roomid]) rooms[roomid] = {};
        


    rooms[roomid][Socket.id] = {
      username,
      x: -1545,
      y: -40,
      avtar,
    };

    
     
    io.to(roomid).emit("players_update", rooms[roomid]);

    });

    Socket.on("send-message",({roomid,message,username})=>{

      console.log(username+""+message);
      
      io.to(roomid).emit("message-recived",{message,username});

    });

     Socket.on("draw", ({ roomid, x0, y0, x1, y1 }) => {

     Socket.to(roomid).emit("draw-data", { x0, y0, x1, y1 });

     });


     Socket.on("send-file", ({ roomid, fileName, fileType, fileData }) => {
      
      console.log(fileName);
      
    Socket.to(roomid).emit("receive-file", {
      fileName,
      fileType,
      fileData,
      senderId: Socket.id,

    });
  });

  
    Socket.on("move", ({ roomid, key }) => {
    const player = rooms[roomid]?.[Socket.id];
    if (!player) return;


     let { x, y } = player;

    switch (key) {
      case "ArrowUp":
      case "ArrowUp":
        y += 50;
        break;
      case "ArrowDown":
      // case "s":
        y -= 50;
        break;
      case "ArrowLeft":
      // case "a":
        x -= 50;
        break;
      case "ArrowRight":
      // case "d":
        x += 50;
        break;
    }


    x = Math.max(movementBounds.minX, Math.min(movementBounds.maxX, x));
    y = Math.max(movementBounds.minY, Math.min(movementBounds.maxY, y));


    player.x = x;
    player.y = y;


    io.to(roomid).emit("players_update", rooms[roomid]);
    
  });


   Socket.on("disconnect", () => {
 
    for (const roomid in rooms) {
      if (rooms[roomid][Socket.id]) {
        delete rooms[roomid][Socket.id];
        io.to(roomid).emit("players_update", rooms[roomid]);
      }
    }
  });

})

server.listen(3001,()=>{

    console.log("server is running at port "+3001);
    
})

