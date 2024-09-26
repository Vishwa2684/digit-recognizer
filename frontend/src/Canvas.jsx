import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({setResults}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);  // Track if eraser is active
  const [lineWidth, setLineWidth] = useState(2);      // Track brush thickness

  // Start drawing or erasing
  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Draw or erase based on the mode
  const draw = (e) => {
    if (!isDrawing) return;
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    if (isErasing) {
      ctx.strokeStyle = 'white'; // Erase with white color
    } else {
      ctx.strokeStyle = 'black'; // Draw with black color
    }

    ctx.lineWidth = lineWidth;   // Set line thickness
    ctx.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear the canvas or save drawing when mouse is up
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  // Initialize the canvas background to white
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Toggle between drawing and erasing modes
  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  // Handle brush thickness change
  const handleThicknessChange = (e) => {
    setLineWidth(e.target.value);
  };

  const sendImageToBackend = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');  // Get the canvas as a base64 encoded image
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),  // sending base64 image in JSON body
      });
      const data = await response.json();
      console.log('Image sent to backend successfully', data);
      setResults(data)

    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
};
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black', cursor: isErasing ? 'crosshair' : 'pointer' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={finishDrawing}
      />

      <div style={{ marginTop: '10px' }}>
        {/* Toggle between draw and erase */}
        <button onClick={toggleEraser}>
          {isErasing ? 'Switch to Draw' : 'Switch to Erase'}
        </button>

        {/* Control brush thickness */}
        <label style={{ marginLeft: '10px' }}>
          Brush Thickness:
          <input
            type="range"
            min="10"
            max="100"
            value={lineWidth}
            onChange={handleThicknessChange}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>

      {/* Send image button */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={sendImageToBackend}>Send Image to Backend</button>
      </div>
    </div>
  );
};

export default Canvas;
