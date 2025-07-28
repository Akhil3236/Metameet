import { useState } from 'react';
import axios from '../axios';
import useUserStore from '../store/userStore';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo2.png"
import Spline from '@splinetool/react-spline';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  // const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://metameet-1.onrender.com/api/v1/signin', { email, password },{withCredentials: true});

      setUser(res.data.userdata);
      
    
      navigate('/user');
      
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (

    <>
    
     <div className='background'>

       <Spline scene="https://prod.spline.design/99LrYdFrT9oFs5gr/scene.splinecode" />

     </div>

     <div className='blackbox'></div>

    <div className="loginpage">

      <div className="nav1">

         <div className="logo">

              <img src={logo} alt="logo" />

         </div>

         <div className="deatils">
              
              <a href="/">about</a>
              <a href="">contact me</a>


         </div>
      </div>

      <div>

      <form onSubmit={handleLogin} className="logindetails">
        <h2 className="loginheading">Login To <a href="/">MetaMeet</a></h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
        <p>Don’t have an account? <a href="/register" >create here</a></p>
      </form>
        
      </div>

      <div className="footer">
         
         

      </div>
    </div>
    </>

  );
}
