import useUserStore from '../store/userStore';
import { use, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const Navigate=useNavigate();
  const user = useUserStore((s) => s.user); //to user
  const setUser = useUserStore((s) => s.setUser); //to set by api 
  const clearUser = useUserStore((s) => s.clearUser);
  const [rooms,setrooms]=useState([]);
  const [isopen,setisopen]=useState(false);
  const [open,setopen]=useState(false);
  const [joinroomid,setjoinroomid]=useState("");


  const [formdata,setformdata]=useState({
    name:"",
    type:""||"public",
    theme:"",
    createdBy:user._id,
    users:user._id,
    assests:""
  })
   const joinroom=()=>{

    setopen(true);

  }
  
  const newroom=(e)=>{
    
    setisopen(true);
    
  }
  const dispaly=async()=>{      
    try{
      
      const rooms_av=await axios.get("https://metameet-1.onrender.com/api/v1/room",{
        
        withCredentials: true
        
      })
      
      
      if(rooms_av.status==202){
        
        window.alert("please create room or join on room")
      }

      
      else{
        
        setrooms(rooms_av.data.rooms); 

      }
      
      
    }
    catch(e){
      
      console.log(e);
      
    }
  }


  const joinnewroom=async(e)=>{
   
    
    
    console.log("clicked");
    
    e.preventDefault();
    const  joinroom=await axios.post("https://metameet-1.onrender.com/api/v1/room/join",{

      roomId:`${joinroomid}`,
      userId:user._id

    },
  {
    withCredentials:true
  })
    dispaly();
    setopen(true);
  }
  const submit=async(e)=>{

    
    e.preventDefault();
     
    console.log(formdata);
    
    if(formdata!=""){
      
      const adduser=await axios.post("https://metameet-1.onrender.com/api/v1/room",formdata,{
      withCredentials: true
    }) 
      setisopen(false);
      setformdata("");
      dispaly();
    }
    

  }
  

  const logout=async()=>{


    const logoutres=await axios.post("https://metameet-1.onrender.com/api/v1/logout",{

      withCredentials:true

    })

    if(logoutres.status==200){

      setUser("");
      Navigate("/login");
    }

  }
  const enterroom=(room)=>{


    Navigate(`room-gird/${room._id}`);


  }
  
  const close=()=>{
     
    setisopen(false);
    setopen(false);

  }

  const deleteroom=async(e)=>{
  

    const roomId=e._id;

    const delteroom=await axios.post("https://metameet-1.onrender.com/api/v1/room/delete",{roomId},{

      withCredentials:true
    })
    
    dispaly();
  }
  return (
  <>
  <div className="nav">

    <div>
      <h1 className="text-3xl font-bold">Welcome, {user?.username || 'Guest'} 👋</h1>
      <p className="mt-2 text-gray-600">You're logged in to MetaMeet.</p>
    </div>

    <div className="create_room">

      <button onClick={newroom}>Create room</button>
      {isopen &&(
        <form className='createroomform'>

           <label htmlFor="name">
             Room Name:
             <input type="text" 
             placeholder='enter the room name'
             required
             name='name'
             value={formdata.name || ""}
             onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
  
             />
           </label>
           <br />
           <label htmlFor="type">
            type:
             <select name="type" 
               value={formdata.name}
               onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
               required

             
             >
              <option value="public">public</option>
              <option value="public">private</option>

             </select>
           </label>

          <br />
           <label htmlFor="theme">

            Theme:

            <input
            type="text"
            name="theme"
            placeholder='enter your theme :'
            value={formdata.theme}
            onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
            required
            
             />

            
           </label>

            <br />

            <label htmlFor="assests">
               assests : 
                <input type="text" 
                name='assests'
                placeholder='enter your assest name :'
                value={formdata.assests}
                onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
                required/>

            </label>
            <br />
          <button onClick={submit}> submit</button>
          <button onClick={close}>close</button>

        </form>
      )}

      <br />

      <button onClick={joinroom}>Join Room</button>
      {
        open &&(
        
          <form onSubmit={joinnewroom} className='createroomform'>

             Room Id:
            <label htmlFor="room">


              <input type="text"
              placeholder='enter the room id'
              value={joinroomid}
              onChange={(e)=>(setjoinroomid(e.target.value))}
              required
              />
            </label>

          <button type='submit'>join</button>

          <button onClick={close}>close</button>

          </form>
        )
      }
      </div>
  </div>

  
      <div className='dash'>   

      <div>
      <button onClick={dispaly}>Refresh</button>
      </div>

      <div>

       <h1>Rooms</h1>

        <div className='rooms'>
        {Array.isArray(rooms) && rooms.map(room => (
          <div key={room._id}className='room'>

            <div className='top'>

                <div className="left">
                  {room._id}
                   <br />
                  {room.name}

                </div>
                <div className="right">

                 {room.type}
                 
                </div>

            </div>

            <div className="theme">

                 {room.theme}

            </div>

            <div className="Bottom">

              <div className="bleft">

                    {/* <strong>
                      CreatedAt:
                      </strong>
                      <br /> */}
                    {room.createdAt.substring(0,10)}
                    <br />
                    {/* {room.createdAt.substring(11.)} */}
              </div>

              <div className="bright">

                     {room.users.length}

              </div>
            </div>

            <div className='roomcardbutton'>

            <button onClick={()=>enterroom(room)}>enter the room</button>
            <button className='btnn' onClick={()=>deleteroom(room)}>D</button>

            </div>

          </div>
          ))}
      </div>
       </div>

  
      </div>

      <div className='footer'>

       <button className='logout' onClick={logout}>logout</button>

      </div>
    </>
  );
}
