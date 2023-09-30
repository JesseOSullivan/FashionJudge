import React from 'react';
import {
  colorNameToRgb,
  isComplementary,
  isAnalogous,
  isSplitComplementary,
  isNeutral,
  isTriadic,
  isMonochromatic
} from '../../utils/colorUtils';

function ColorAssessment({ colors }) {
  const rgbColors = colors.map(color => colorNameToRgb(color));

  let feedback = null;

  if (isMonochromatic(...rgbColors)) {
    feedback = 'The colors are monochromatic.';
  } else if (rgbColors.length >= 3 && isTriadic(...rgbColors)) {
    feedback = 'The colors form a triadic combination.';
  } else if (rgbColors.length >= 3 && isSplitComplementary(rgbColors[0], rgbColors[1], rgbColors[2])) {
    feedback = 'The colors form a split-complementary combination.';
  } else if (rgbColors.length >= 2 && isComplementary(rgbColors[0], rgbColors[1])) {
    feedback = 'The colors are complementary.';
  } else if (rgbColors.length >= 2 && isAnalogous(rgbColors[0], rgbColors[1])) {
    feedback = 'The colors are analogous.';
  } else {
    for (let idx = 0; idx < rgbColors.length; idx++) {
      if (isNeutral(rgbColors[idx])) {
        feedback = `Color ${idx + 1} is neutral.`;
        break;
      }
    }
  }

  if (!feedback) {
    feedback = "You're making a bold fashion statement!";
  }

  return (
    <div>
      <h3>Color Assessment:</h3>
      <p>{feedback}</p>
    </div>
  );
}

export default ColorAssessment;
