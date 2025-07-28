import React, { useRef, useState, useEffect } from "react";
import "./popup.css";
import socket from "./socket";
import { useParams } from "react-router-dom";

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const { roomid } = useParams();

  // Track last position persistently
  const lastX = useRef(0);
  const lastY = useRef(0);


  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 400;
    const context = canvas.getContext("2d");

    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round"; // Important for smooth corners
    context.strokeStyle = "black";

    setCtx(context);

    // Receive drawing data from other users
    socket.on("draw-data", ({ x0, y0, x1, y1 }) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.stroke();
    });

    return () => {
      socket.off("draw-data");
    };
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    lastX.current = e.nativeEvent.offsetX;
    lastY.current = e.nativeEvent.offsetY;
  };
  
  const draw = (e) => {
    if (!isDrawing || !ctx) return;

    const newX = e.nativeEvent.offsetX;
    const newY = e.nativeEvent.offsetY;

  
    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(newX, newY);
    ctx.stroke();


    socket.emit("draw", {
      roomid,
      x0: lastX.current,
      y0: lastY.current,
      x1: newX,
      y1: newY,
    });

    lastX.current = newX;
    lastY.current = newY;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const [file, setFile] = useState(null);
  const [base64Data, setBase64Data] = useState("");

  
   const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBase64Data(reader.result); // Store base64 string
    };
    reader.readAsDataURL(selectedFile);
  };

   const handleSend = () => {
    if (!file || !base64Data) {
      alert("Please select a file first.");
      return;
    }

    socket.emit("send-file", {
      roomid,
      fileName: file.name,
      fileType: file.type,
      fileData: base64Data,
    });

    alert("📤 File sent!");
    setFile(null);
    setBase64Data("");

  };

  const [receivedFiles, setReceivedFiles] = useState([]);

  useEffect(() => {
  socket.on("receive-file", ({ fileName, fileType, fileData, senderId }) => {
    console.log("Received file:", { fileName, fileType, senderId, fileData }); // <-- log here
    setReceivedFiles(prev => [...prev, { fileName, fileType, fileData, senderId }]);
  });

  return () => socket.off("receive-file");
}, []);
  
  return (
    <div className="drawboard">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid black", background: "#fff" }}
      />

      <div className="bb">
        <button
          style={{ background: "red", color: "white", width:"80px"}}
          onClick={clearCanvas}
        >
          Clear
        </button>
        <input type="file" placeholder="add file" onChange={handleFileChange} className="inputbox"/>
        <button onClick={handleSend} className="sendbutton">send</button>


        </div>
        <div className="received-files">
        <button
        className="but-clear"
        onClick={() => setReceivedFiles([])}>
        Clear Received Files
        </button>
        <div>


          <h4>Received Files:</h4>
          {receivedFiles.length === 0 && <p>No files received yet.</p>}
          {receivedFiles.map((file, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <p>
                <strong>{file.fileName}</strong> ({file.fileType})
              </p>
              {file.fileType.startsWith("image/") && (
                <img src={file.fileData} alt={file.fileName} style={{ maxWidth: "120px", display: "block", marginBottom: "6px" }} />
              )}
              <a href={file.fileData} download={file.fileName} className="download">Download</a>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
};

export default DrawingBoard;
