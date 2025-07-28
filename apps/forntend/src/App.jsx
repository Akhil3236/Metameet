import { FaVideo, FaUsers, FaCube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';


export default function MetaMeetDashboard() {

  const navigate=useNavigate();
  const login=()=>{

    navigate("/login");

  }
  return (
    <div className="min-h-screen text-slate-100 px-4 py-10 flex items-center justify-center">

      <div className='background'>

       <Spline scene="https://prod.spline.design/99LrYdFrT9oFs5gr/scene.splinecode" />

     </div>

     <div className='blackbox'></div>
      <div className="max-w-5xl w-full text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Welcome to MetaMeet
        </h1>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Your one-stop solution for immersive virtual meetings, classes, and shared digital spaces.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 justify-items-center">
          <FeatureCard
            title="Host Live Meetings"
            description="Seamlessly start or join live video sessions with ease and stability."
            icon={<FaVideo className="text-3xl text-white" />}
          />
          <FeatureCard
            title="Collaborate in Real-Time"
            description="Chat, share files, and engage with your team in shared spaces."
            icon={<FaUsers className="text-3xl text-white" />}
          />
          <FeatureCard
            title="3D Virtual Rooms"
            description="Experience immersive 3D environments tailored for meetings or fun."
            icon={<FaCube className="text-3xl text-white" />}
          />
        </div>

        <button onClick={login}className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl shadow-lg transition-colors duration-200 flex flex-col items-start gap-4 max-w-sm w-full">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
