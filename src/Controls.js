/// Controls.js
import React from 'react';

function Controls({ clearCanvas, downloadImage }) {
  const handleClearCanvas = () => {
    clearCanvas();
  };

  const handleDownloadImage = () => {
    downloadImage();
  };

  return (
    <div className="controls">
      <button onClick={handleClearCanvas}>Borrar</button>
      <button onClick={handleDownloadImage}>Descargar Imagen</button>
    </div>
  );
}

export default Controls;
