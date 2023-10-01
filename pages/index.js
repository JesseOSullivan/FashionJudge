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
  const [isPhotoTaken, setIsPhotoTaken] = React.useState(false);

  const [loadingFeedback, setLoadingFeedback] = React.useState(false);
  const handleImageCapture = async (imageSrc) => {
    setIsPhotoTaken(true);
    setLoadingFeedback(true);  // Set the loadingFeedback to true immediately after taking a photo
    const results = await fetchData(imageSrc);
    const asticaData = await getAsticaDescription(imageSrc);
    setApiResults(results);
    setAsticaResults(asticaData);
    setTimeout(() => {
      setLoadingFeedback(false);  // Set it back to false after 5 seconds
    }, 5);
};


  let gptContentBase = `In 2 sentences, evaluate my outfit based on standard fashion rules, highlight any potential colour mismatches, and conclude with a brief judgment with constructive feedback. Feel free to suggest SPECIFIC alternatives or general suggestions. Do not mention or include ANY belts, watches, or shoes unless the colour is specified. Do not say it's difficult to evaluate. If there are unknowns, then ignore them. I'm wearing: ${fashionDetails.map(item => `${item.color} ${item.type}`).join(', ')}.`;

  if(asticaResults) {
    gptContentBase += ` My skin tone is ${asticaResults["skin-tone"]}, hair color is ${asticaResults["hair-color"]}, and eye color is ${asticaResults["eye-color"]}.`;
}

let gptContent = "";
if (sliderValue === 0) {
  console.log("ross");
  gptContent = "Please provide a gentle and positive evaluation like Bob Ross. " + gptContentBase;
} else if (sliderValue === 50) {  // Assuming 50 is the standard value
  console.log("standard");
  gptContent = "Give a neutral and balanced feedback. " + gptContentBase;
} else if (sliderValue === 100) {
  console.log("gordan");
  gptContent = "Be brutally honest like Gordon Ramsay and use strong language often. " + gptContentBase;
}
console.log(gptContent); // Log here to check the final gptContent


return (
  <div className={styles.container}>
      <main className={styles.main}>
      {/* Row 1 - Camera */}
<div className={styles.row}>
    <div className={styles.cameraContainer}>
        <WebcamCapture onCapture={handleImageCapture} />
    </div>
</div>
{isPhotoTaken ? (
    <>
        {loadingFeedback ? (
            <div className={styles.loadingFull}>
                <div className={styles.spinner}></div>
            </div>
        ) : (
            <>
                <div className={styles.slider}>
                    <DiscreteSliderValues value={sliderValue} setValue={setSliderValue} />
                </div>

                {/* Row 2 - Always show, regardless of detected items */}
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h3>Detected Items</h3>
                        {fashionDetails.length > 0 ? (
                            <ul>
                                {fashionDetails.map((item, idx) => (
                                    <li key={idx}>
                                        Color: {item.color}, Type: {item.type}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items detected.</p>
                        )}
                    </div>

                    {asticaResults ? (
                        <div className={styles.column}>
                            <h4>Identified Features</h4>
                            <p><strong>Skin Tone:</strong> {asticaResults["skin-tone"]}</p>
                            <p><strong>Hair Color:</strong> {asticaResults["hair-color"]}</p>
                            <p><strong>Eye Color:</strong> {asticaResults["eye-color"]}</p>
                        </div>
                    ) : (
                        <div className={styles.column}>
                            <h4>Identified Features</h4>
                            <p>No features identified.</p>
                        </div>
                    )}
                </div>

                {/* Row 3 - GPT Fetch AI Details */}
                <div className={styles.row}>
                    <div>
                        <GPTQueryComponent content={gptContent} />
                    </div>
                </div>
            </>
        )}
    </>
) : (
    <div className={styles.loading}>
        <p>Please capture a photo to continue...</p>
    </div>
)}
      </main>
  </div>
);
}

