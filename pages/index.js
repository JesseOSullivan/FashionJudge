import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import WebcamCapture from '@components/Camera/Camera';
import React from 'react';
import fetchData from '../api/fetchData';
import ColorAssessment from '@components/colorAssessment/index';
import GPTQueryComponent from '@components/chatgpt/chatgpt';
import getAsticaDescription from '../api/fetchvision';
import DiscreteSliderValues from '@components/slider/slider';
import styles from './index.module.css';



const extractColorsFromResults = (results) => {
  if (!results || !results.records || !results.records[0]._objects) return [];
  return results.records[0]._objects.map(obj => obj._tags_map.Color);
};


const extractFashionDetailsFromResults = (results) => {
  if (!results || !results.records || !results.records[0]._objects) return [];

  return results.records[0]._objects.map(obj => {
      let color = obj._tags_map.Color || "unknown color";
      let type;

      if (obj._tags_map.Subcategory) {
          type = obj._tags_map.Subcategory.toLowerCase();
      } else if (obj._tags_map.Category) {
          type = obj._tags_map.Category.split('/')[1].toLowerCase();
      } else {
          type = obj.name.toLowerCase();
      }

      if (type === 'upper') {
          type = 'top';
      }

      return {color, type};
  });
};

export default function Home() {
  const [apiResults, setApiResults] = React.useState(null);
  const [asticaResults, setAsticaResults] = React.useState(null);
  const fashionDetails = extractFashionDetailsFromResults(apiResults);
  const [sliderValue, setSliderValue] = React.useState(50);  // initializing with 50 (Standard)




const handleSliderChange = (value) => {
  console.log("Slider Value:", value);
  setSliderValue(value);
};


  const handleImageCapture = async (imageSrc) => {
    const results = await fetchData(imageSrc);
    const asticaData = await getAsticaDescription(imageSrc);
  console.log(`Astica Data: ${JSON.stringify(asticaData)}`); // Use backticks and JSON.stringify for objects
    console.log(results);
    setApiResults(results);
    setAsticaResults(asticaData);

    console.log(fashionDetails);
  };

  let gptContent = `In 2 sentences, evaluate my outfit based on standard fashion rules, highlight any potential colour mismatches, and conclude with a brief judgment with constructive feedback. Feel free to suggest SPECIFIC alternatives or general suggestions. Do not mention or include ANY belts, watches, or shoes unless the colour is specified. Do not say it's difficult to evaluate. If there are unknowns, then ignore them. I'm wearing: ${fashionDetails.map(item => `${item.color} ${item.type}`).join(', ')}.`;

  if(asticaResults) {

    gptContent += ` My skin tone is ${asticaResults["skin-tone"]}, hair color is ${asticaResults["hair-color"]}, and eye color is ${asticaResults["eye-color"]}.`;
    console.log(gptContent)

  }

  let judgementStyle = "";
  if (sliderValue === 0) {
    console.log("ross");
    judgementStyle = "Please give a gentle and positive feedback. ";
  } else if (sliderValue === 100) {
    console.log("gordan");
    judgementStyle = "Be brutally honest. ";
  }
  
  gptContent = judgementStyle + gptContent;
  console.log(gptContent); // Now you can check the final gptContent
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Row 1 - Camera */}
        <div className={styles.row}>
          <div className={styles.cameraContainer}>
            <WebcamCapture onCapture={handleImageCapture} />
            
          </div>
        </div>
  
        <div className={styles.slider}>
        <DiscreteSliderValues value={sliderValue} setValue={setSliderValue} />
        </div>

        {/* Row 2 - Clothing and Feature Details */}
        {fashionDetails.length > 0 && (
          <div className={styles.row}>
            <div className={styles.column}>
              <h3>Detected Items</h3>
              <ul>
                {fashionDetails.map((item, idx) => (
                  <li key={idx}>
                    Color: {item.color}, Type: {item.type}
                  </li>
                ))}
              </ul>
            </div>
            {asticaResults && (
              <div className={styles.column}>
                <h4>Identified Features</h4>
                <p><strong>Skin Tone:</strong> {asticaResults["skin-tone"]}</p>
                <p><strong>Hair Color:</strong> {asticaResults["hair-color"]}</p>
                <p><strong>Eye Color:</strong> {asticaResults["eye-color"]}</p>
              </div>
            )}
          </div>
        )}
  
        {/* Row 3 - GPT Fetch AI Details */}
        <div className={styles.row}>
          <div>
            <GPTQueryComponent content={gptContent} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
  };
