import React from 'react';
import Webcam from "react-webcam";
import styles from './index.module.css';
const WebcamCapture = ({ onCapture }) => {
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = React.useState(null);  // state to store the captured image
  const [webcamActive, setWebcamActive] = React.useState(true);    // state to check if webcam is active
  const [cameraFacing, setCameraFacing] = React.useState("user"); // user = front camera, environment = back camera

  const switchCamera = () => {
    setCameraFacing(prev => prev === "user" ? "environment" : "user");
  };
  
  const capture = React.useCallback(() => {
    if (webcamActive) {  // only try to capture if webcam is active
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);  // set the captured image
      onCapture(imageSrc);
      setWebcamActive(false);  // set webcam to inactive after capturing
    } else {
      setCapturedImage(null);  // clear the captured image
      setWebcamActive(true);   // revert back to live webcam feed
    }
  }, [webcamRef, onCapture, webcamActive]);

  return (
    <div className={styles['webcam-container']}>
      <button onClick={switchCamera} className={styles['switch-camera']}>Switch Camera</button>

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
