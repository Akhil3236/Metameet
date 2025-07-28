import { useState } from 'react';
import axios from '../axios';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();
  
  const [formdata,setformdata]=useState({

    username:"",
    email:"",
    password:"",

  })

 

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(formdata);
    
    try {
      const res = await axios.post('http://localhost:3000/api/v1/signup',formdata);
      // setUser(res.data.userdata);

      console.log(res);
      
      if(res.status===200){
        navigate("/login");
      }
      else{
        window.alert("email or username already exits");
      }

    } catch (err) {
      alert('Registration failed: ' + err);
    }
  };

  return (

    <>

    <div className='background'>

       <Spline scene="https://prod.spline.design/99LrYdFrT9oFs5gr/scene.splinecode" />

     </div>

     <div className='blackbox'></div>

    
    <>
    

    <div className="register_page">
      <form onSubmit={handleRegister} className="registerdeatils">
        <h2 className="regist">Register For <a href="/">MetaMeet</a></h2>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formdata.username}
          onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
          required

        />
        <input
          type="email"
          name='email'
          placeholder="Enter Your Email"
          value={formdata.email}
          onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
          required

        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={(e)=>setformdata({...formdata,[e.target.name]:e.target.value,})}
          required

        />
        <button>Register</button>
        <p >Already have an account? <a href="/login">click here</a></p>
      </form>
    </div>

        </>
    </>
  );
}
