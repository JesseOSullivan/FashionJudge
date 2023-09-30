import React, { useState, useEffect } from 'react';

function GPTQueryComponent({ content }) {
    const [response, setResponse] = useState("");

    useEffect(() => {
        async function getGPTResponse() {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: content })
                };
                
                const result = await fetch('https://meal-prep.onrender.com/get-gpt-response', requestOptions);
                const data = await result.json();
                setResponse(data.response);
            } catch (error) {
                console.error("Error getting response from GPT-3: ", error);
            }
        }

        getGPTResponse();
    }, [content]); // The function inside useEffect will run once when the 'content' prop changes

    return (
        <div>
            <h2>GPT-3 Response:</h2>
            <p>{response}</p>
        </div>
    );
}

export default GPTQueryComponent;
