import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import WebcamCapture from '@components/Camera/Camera';
import React from 'react';
import fetchData from '../api/fetchData';
import ColorAssessment from '@components/colorAssessment/index';

import styles from './index.module.css'; // adjust the path accordingly






export default function Home() {
  const [apiResults, setApiResults] = React.useState(null);

  const handleImageCapture = async (imageSrc) => {
    const results = await fetchData(imageSrc);
    console.log(results);  // Log the API response
    setApiResults(results);
};



  const extractColorsFromResults = (results) => {
    if (!results || !results.records || !results.records[0]._objects) return [];
    return results.records[0]._objects.map(obj => obj._tags_map.Color);
  };

  const colors = extractColorsFromResults(apiResults);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header title="Welcome to my app!" />
        <div className={styles.cameraContainer}>
          <WebcamCapture onCapture={handleImageCapture} />
        </div>
        {apiResults && (
          <div className={styles.resultsContainer}>
            <h3>Colors Detected:</h3>
            <h2 className={styles.colorDisplay}>{colors.join(", ")}</h2>
            <ColorAssessment colors={colors} />

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
