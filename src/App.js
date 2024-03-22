import React, { useState } from 'react';
import './App.css';
import Webcam from 'react-webcam';

function App() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const [imageSrc, setImageSrc] = useState(null); // State to store captured image

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture photo using ref
    setImageSrc(imageSrc); // Set captured photo to state
  };

  const downloadPhoto = () => {
    if (imageSrc) {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'captured_photo.jpeg';
      link.click();
    }
  };

  const webcamRef = React.useRef(null); // Reference to webcam component

  return (
    <div className="App">
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/pdf"
        width={1280}
        videoConstraints={videoConstraints}
        ref={webcamRef} // Assign ref to webcam component
        facingMode='user'
      />
      <button onClick={capturePhoto}>Capture photo</button>
      {imageSrc && (
        <>
          <img src={imageSrc} alt="Captured" /> {/* Display captured image */}
          <button onClick={downloadPhoto}>Download</button> {/* Button to download the captured photo */}
        </>
      )}
    </div>
  );
}

export default App;
