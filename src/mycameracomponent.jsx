import { useState, useEffect, useRef } from 'react';

export default function CameraComponent() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef();

  useEffect(() => {
    // Access the user's camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        // Attach the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.log('Error accessing camera:', error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    // Clean up the stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [stream]);

  return (
    <div>
      <h1>Camera Stream</h1>
      <video ref={videoRef.current} autoPlay playsInline style={{ width: '100%', height: 'auto', border: '1px solid black' }}></video>
      <video src="">{stream}</video>
    </div>
  );
}
