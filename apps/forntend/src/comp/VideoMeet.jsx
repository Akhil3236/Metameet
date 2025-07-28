import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function VideoMeet() {
  const containerRef = useRef();
  const roomId=useParams();

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: {roomId},
      width: "800px",
      height: "500px",
      parentNode: containerRef.current,
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose();
  }, []);

  return (
   
    <div className="videocall">
      <div ref={containerRef}></div>
    </div>
  );
}
