import React from 'react';
import Webcam from "react-webcam";
import styles from './index.module.css';
const WebcamCapture = ({ onCapture }) => {
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = React.useState(null);  // state to store the captured image
  const [webcamActive, setWebcamActive] = React.useState(true);    // state to check if webcam is active
  const [cameraFacing, setCameraFacing] = React.useState("user"); // user = front camera, environment = back camera
  const [countdown, setCountdown] = React.useState(null);

  const switchCamera = () => {
    setCameraFacing(prev => prev === "user" ? "environment" : "user");
  };

  
  
  const capture = React.useCallback(() => {
    if (webcamActive) {
      setCountdown(3);  // Start the countdown
  
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
  
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            onCapture(imageSrc);
            setWebcamActive(false);
  
            return null; // Reset countdown after it hits 0
          }
          
          return prev - 1; // Decrease the countdown
        });
      }, 1000);
    } else {
      setCapturedImage(null);
      setWebcamActive(true);
    }
  }, [webcamRef, onCapture, webcamActive]);
  
  return (
    <div className={styles['webcam-container']}>
      <button onClick={switchCamera} className={styles['switch-camera']}>Switch Camera</button>
      {countdown && <div className={styles['countdown']}>{countdown}</div>}

      {webcamActive ? (
          <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={styles['webcam-style']}
          videoConstraints={{ facingMode: cameraFacing }}
      />
      
      ) : (
          <img src={capturedImage} alt="Captured" className={styles['webcam-style']} />  // display the captured image
      )}
      <div className={styles['button-container']}>            
         <button className={styles['capture-button']} onClick={capture}>
            {webcamActive ? "Capture photo" : "Retake photo"}
         </button>
      </div>
    </div>
 );
};


export default WebcamCapture;
