import { useEffect, useState } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import "/src/index.css"
import Backgorund from './Backgorund';
import ClassChatPopup from './class.jsx';
import { getZoneFromCoords } from '../comp/Zone.js';
import DrawingBoard from './DrawingBoard.jsx';
import Red from './Red.jsx';
import Game from './Game.jsx';
import socket from './socket.js';
import VideoMeet from './VideoMeet.jsx';


const movementBounds = {
  minX: -2100,
  maxX: 2080,
  minZ: -1080,
  maxZ: 1020,
};



const RoomGrid=()=> {

  const [players, setPlayers] = useState({});
  const {roomid}=useParams();
  const avtarcor={
    x:"",
    y:""
  }
  const [roomdata,setroomdata]=useState({})
  const user=useUserStore((s)=>s.user)
  const [socketid,setid]=useState("");
  const username =user.username||"";
  const avtar=user.avatarUrl||"";
  const navigate = useNavigate();
  const [currentZone,setcurrentzone]=useState({});
  


 useEffect(() => {
  const currentPlayer = Object.values(players).find(
    (p) => p.username === user.username
  );

  if (currentPlayer) {
    const zone = getZoneFromCoords(currentPlayer.x, currentPlayer.y);
    setcurrentzone(zone);
  }
}, [players, user.username]);


  useEffect(()=>{

    socket.on("socketdata",(socket)=>{

      setid(socket);  
    })
    if (!user) {
    navigate('/login');
    return;
    }

    socket.emit("join_room",{username:username,roomid,avtar:avtar});
    
    socket.on("players_update", (data) => {
      setPlayers(data);

      console.log(data); 
    });

const handleKeyDown = (e) => {
        socket.emit("move", { roomid, key: e.key });

};

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      socket.off("players_update");
    };
  },[user, username, roomid, avtar])

  const home=()=>{

    navigate("/user");
  }
  return (
  

    <>

    <div className='top1'>

     <p className='roomid'>Room-id : {roomid}</p>
     <button className='button' onClick={home}> exit</button>

    </div>

  <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100vw', height: '100vh' }}>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <directionalLight position={[0, 0, 10]} />

  <Backgorund />

  {Object.entries(players).map(([id, player]) => (
    <group key={id} position={[player.x/600,player.y/600, 0.1]}>
      
      <Html center>
        <p style={{ padding: '2px 20px', borderRadius: '6px', color:'white' }}>
          {player.username}
        </p>
      </Html>
      <Red/>
    </group>
  ))}

  <OrbitControls />
</Canvas>

    

    {Object.entries(players).map(([id,player])=>{
      
       return(
        <div>
          
        {player.username === user.username && currentZone === "class" && (
         <ClassChatPopup />
        )}
        {player.username === user.username && currentZone === "drawRoom" && (
         <DrawingBoard/>

       )}

        {player.username === user.username && currentZone === "Game" && (
         <Game/>

       )}
        {player.username === user.username && currentZone === "call" && (

         <VideoMeet/>

       )}

       </div>)

    })}

    </>

  )
}
export default RoomGrid;