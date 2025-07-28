
import { useEffect, useState} from "react";
import "./popup.css";
import socket from "./socket";
import useUserStore from "../store/userStore";
import { useParams } from "react-router-dom";

export default function ClassChatPopup() {
  

  const [message,setmessage]=useState("");
  const user=useUserStore((e)=>e.user);
  const {roomid}=useParams();
  

  const [messages,setmessages]=useState([]);


  const username=user.username
  const sendmessage=(e)=>{

    e.preventDefault();

    socket.emit("send-message",({username,roomid,message}));

    setmessage("");
  }

useEffect(() => {

    const handleMessageReceived = ({ message, username }) => {
      setmessages((prev) => [...prev, { message, username }]);
    };

   console.log(messages);
   
    
    socket.on("message-recived", handleMessageReceived);

    return () => {
      socket.off("message-recived", handleMessageReceived);
    };
  });

  return (
    <>
    <div className="mainarea">      
     <div className="mainbox">

        <h1>Chat with </h1>

         <div className="output">
             
          
           {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.username}: </strong>{msg.message}
            
          </div>
        ))}
       
        </div>
        <div className="form">

          <input type="text" 
           placeholder="Enter your message"
           name="message"
           value={message}
           onChange={(e)=>setmessage(e.target.value)}


          />

          <button onClick={sendmessage} onSubmit={sendmessage}>send</button>

        </div>
        

     </div>


    </div>
    </>
  );
}
