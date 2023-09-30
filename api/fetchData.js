const API_TOKEN = '83c49abd7773d0101a53bced03a27a925bd8146f';
const url = 'https://api.ximilar.com/tagging/fashion/v2/detect_tags_all';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${API_TOKEN}`
};

async function fetchData(base64Image) {
  const requestData = {
      records: [
          {
              _base64: base64Image
          }
      ]
  };

  let output;

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestData)
      });

      output = await response.json();

      for (let i = 0; i < output.records[0]._objects.length; i++) {
        const object = output.records[0]._objects[i];
        console.log(object._tags_map.Color);
    }       

  } catch (error) {
      console.error('Error:', error);
  }

  return output;
}

export default fetchData;
