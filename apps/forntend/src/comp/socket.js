
import { io } from 'socket.io-client';

const socket = io("https://metameet-lsad.onrender.com", {
  transports: ["websocket"], // optional
  secure: true,
});

export default socket;
