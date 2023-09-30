import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import WebcamCapture from '@components/Camera/Camera';
import React from 'react';
import fetchData from '../api/fetchData';
import ColorAssessment from '@components/colorAssessment/index';
import GPTQueryComponent from '@components/chatgpt/chatgpt';
import styles from './index.module.css'; // adjust the path accordingly





const extractColorsFromResults = (results) => {
  if (!results || !results.records || !results.records[0]._objects) return [];
  return results.records[0]._objects.map(obj => obj._tags_map.Color);
};

const extractFashionDetailsFromResults = (results) => {
  if (!results || !results.records || !results.records[0]._objects) return [];

  return results.records[0]._objects.map(obj => {
      let color = obj._tags_map.Color || "unknown color";
      let type = obj._tags_map.Category ? obj._tags_map.Category.split('/')[1] : obj.name.toLowerCase();
      return {color, type};
  });
};

export default function Home() {
  const [apiResults, setApiResults] = React.useState(null);
  const fashionDetails = extractFashionDetailsFromResults(apiResults);

  const handleImageCapture = async (imageSrc) => {
    const results = await fetchData(imageSrc);
    console.log(results);  // Log the API response
    setApiResults(results);

    console.log(fashionDetails)
  };

  console.log(`Provide a short, concise review for my outfit. Im wearing: ${fashionDetails.map(item => `${item.color} ${item.type}`).join(', ')}.`)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header title="Welcome to my app!" />
        <div className={styles.cameraContainer}>
          <WebcamCapture onCapture={handleImageCapture} />
        </div>
        {fashionDetails.length > 0 && (
          <div className={styles.resultsContainer}>
            <h3>Fashion Judges verdict</h3>
            <ul>
              {fashionDetails.map((item, idx) => (
                <li key={idx}>
                  Color: {item.color}, Type: {item.type}
                </li>
              ))}
            </ul>
            <GPTQueryComponent content={`In 2 sentences, evaluate my outfit based on standard fashion rules, highlight any potential colour mismatches, and conclude with a brief judgment with constructive feedback. feel free to suggest alternatives. Do not mention or include ANY clothing or accessory details that show unknowns or unknown colors or any difficulties in judgment. I'm wearing: ${fashionDetails.map(item => `${item.color} ${item.type}`).join(', ')}.`} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
