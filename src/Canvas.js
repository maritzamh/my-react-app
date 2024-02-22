// Canvas.js
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function Canvas() {
    const canvasRef = useRef(null);
    const [drawingId, setDrawingId] = useState(0); // Identificador único para cada dibujo
    const [ctx, setCtx] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    let lastX = null; // Declaración de lastX
    let lastY = null; // Declaración de lastY
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      setCtx(context);
    }, []);
  
    const startDrawing = () => {
      setIsDrawing(true);
    };
  
    const endDrawing = () => {
      setIsDrawing(false);
      lastX = null; // Restablecer lastX
      lastY = null; // Restablecer lastY
    };
  
    const draw = (event) => {
      if (!ctx || !isDrawing) return; // Verificar si ctx es null
      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      ctx.lineWidth = 5;
      
      if (!lastX || !lastY) {
          lastX = x;
          lastY = y;
      }
  
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
  
      lastX = x;
      lastY = y;
    };
  
    const startNewDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        // Limpiar el lienzo
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        // Restablecer el estado de dibujo
        setIsDrawing(false);
    
        // Actualizar el identificador de dibujo para forzar la actualización de la aplicación
        setDrawingId(drawingId + 1);
      };

    const downloadImage = () => {
      if (!ctx) return; // Verificar si ctx es null
      const imageURL = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
        ></canvas>
        <div className="controls">
        <button onClick={startNewDrawing}>Nuevo Dibujo</button>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button onClick={downloadImage}>Descargar Imagen</button>
        </div>
      </div>
    );
  }
  export default Canvas;
