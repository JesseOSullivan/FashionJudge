const convert = require('color-convert');


function sanitizeColorName(colorName) {
    return colorName.replace(/\s+/g, '').toLowerCase();
}


export function colorNameToRgb(colorName) {
    colorName = sanitizeColorName(colorName); // Add this line

    let hex = colourNameToHex(colorName);
    

    if (!hex) {
        try {
            // Attempt to use convert's colorNameToRgb method
            return convert.keyword.rgb(colorName);
        } catch (error) {
            console.error(`Color ${colorName} not found in the list or convert's method.`);
            return null;
        }
    }
    
    return convert.hex.rgb(hex);
}



export function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

export function isComplementary(color1, color2) {
    const [h1] = convert.rgb.hsl(color1);
    const [h2] = convert.rgb.hsl(color2);
    let diff = Math.abs(h1 - h2);
    
    // Adjust for the cyclical nature of hue
    if (diff > 180) diff = 360 - diff; 
    
    // Check for both complementary (180 degree difference) and the purple-yellow difference (120 degree difference)
    return Math.abs(diff - 180) < 20 || Math.abs(diff - 120) < 20 || diff === 0;
}

export function isAnalogous(color1, color2) {
    const [h1] = convert.rgb.hsl(color1);
    const [h2] = convert.rgb.hsl(color2);
    let diff = Math.abs(h1 - h2);
    diff = diff > 180 ? 360 - diff : diff; // Adjust for the cyclical nature of hue
    return diff < 65; // 60 degrees on the color wheel
}


export function isSplitComplementary(baseColor, color1, color2) {
    const [baseHue] = convert.rgb.hsl(baseColor);
    const [h1] = convert.rgb.hsl(color1);
    const [h2] = convert.rgb.hsl(color2);

    const complement = (baseHue + 180) % 360; // Calculate the complementary hue
    
    // Calculate distances from the complementary hue, accounting for the cyclical hue wheel
    const diff1 = Math.min(Math.abs(complement - h1), 360 - Math.abs(complement - h1));
    const diff2 = Math.min(Math.abs(complement - h2), 360 - Math.abs(complement - h2));

    // Check if the two colors are within an allowed range from the complementary color
    const isColor1AdjacentToComplement = diff1 <= 160;  // Increased from 120
    const isColor2AdjacentToComplement = diff2 <= 160;  // Increased from 120

    // Ensure they are not too close to each other or the complement
    const areColorsNotTooCloseToEachOther = Math.abs(h1 - h2) > 10;  // Decreased from 30

    return isColor1AdjacentToComplement && isColor2AdjacentToComplement && areColorsNotTooCloseToEachOther;
}
export function isNeutral(color) {
    const [h, s, l] = convert.rgb.hsl(color);

    // If saturation is very low, consider the color as neutral.
    const lowSaturation = s < 130;  

    // Colors in the red or blue range might not be neutrals even if they have low saturation
    const notRedOrBlue = (h > 20 && h < 330);
    
    return lowSaturation && notRedOrBlue;
}



export function isTriadic(color1, color2, color3) {
    const [h1] = convert.rgb.hsl(color1);
    const [h2] = convert.rgb.hsl(color2);
    const [h3] = convert.rgb.hsl(color3);

    let diff1 = Math.abs(h1 - h2);
    let diff2 = Math.abs(h2 - h3);
    let diff3 = Math.abs(h1 - h3);

    // Adjust for the cyclical nature of hue
    if (diff1 > 180) diff1 = 360 - diff1;
    if (diff2 > 180) diff2 = 360 - diff2;
    if (diff3 > 180) diff3 = 360 - diff3;

    const threshold = 40; // Increase this value for a wider range. Here I've used 30 degrees.

    return (Math.abs(diff1 - 120) < threshold && Math.abs(diff2 - 120) < threshold) ||
           (Math.abs(diff1 - 120) < threshold && Math.abs(diff3 - 120) < threshold) ||
           (Math.abs(diff2 - 120) < threshold && Math.abs(diff3 - 120) < threshold);
}


function rgbToHsv([r, g, b]) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, v * 100];
}
  

export function isMonochromatic(...colors) {
    if (colors.length < 2) return false;
    const firstColorHSV = rgbToHsv(colors[0]);
    for (let i = 1; i < colors.length; i++) {
      const nextColorHSV = rgbToHsv(colors[i]);
      if (Math.abs(firstColorHSV.h - nextColorHSV.h) > 10) { // a tolerance of 10 degrees
        return false;
      }
    }
    return true;
  }
  

