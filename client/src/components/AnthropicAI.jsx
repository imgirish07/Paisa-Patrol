import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:8000';
function AnthropicAI() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState([]);

    // onChange function
    const handlePrompt = (event) => {
        setPrompt(event.target.value);
    }

    // post the message to the backend
    const handleAssistant = async () => {
        try {
            const res = await axios.post(`${baseUrl}/api/anthropic`, {
                prompt: prompt,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });

            const message = res.data.completion; // Adjust based on your response structure
            setResponse(prevResponses => [...prevResponses, ...message]); // Append the new message to the previous responses
            //console.log("message:", message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[85vh] w-full lg:w-[60%] p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Hello, How may I assist you?</h1>
                <div className="overflow-auto h-full w-full p-4 border border-gray-200 bg-gray-50 rounded-lg">
                    {response.map((res, index) => (
                        <p key={index} className="mb-4 bg-[#D29BFF] text-white font-semibold px-4 py-2 rounded-lg">{res.text}</p>
                    ))}
                </div>

            </div>

            <div className="flex flex-col items-center justify-center h-[15vh] w-full lg:w-[60%] p-4 mt-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        id="prompt"
                        value={prompt}
                        name="prompt"
                        placeholder="Enter your query"
                        onChange={handlePrompt}
                        className="bg-white text-purple-800 h-16 w-full px-4 pr-16 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-200 ease-in-out transform focus:shadow-md"
                    />
                    <button
                        onClick={handleAssistant}
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 transition duration-200 ease-in-out hover:scale-105 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default AnthropicAI;
