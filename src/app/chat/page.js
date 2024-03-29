"use client";
import React, { useState, useEffect, useRef } from "react";
import { translate } from "@vitalets/google-translate-api";

export default function GetData() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("Namaskar bheno aur bhaiyo");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([
    {
      role: "Adira",
      message: "Hi welcome to adira our own women ki baatchit",
      profilePic: "https://shorturl.at/bCIX1" // Adira's profile picture URL
    },
  ]);
  const messagesEndRef = useRef(null);
  const [principleQuery, setPrincipleQuery] = useState("");
  const recognition = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("en");

  useEffect(() => {
    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = 'en-US';
    recognition.current.onresult = handleSpeechRecognitionResult;
    recognition.current.onend = handleSpeechRecognitionEnd;
  }, []);

  const handleSpeechRecognitionResult = (event) => {
    const transcript = event.results[0][0].transcript;
    setQuery(transcript);
    setIsRecording(false);
  };

  const handleSpeechRecognitionEnd = () => {
    setIsRecording(false);
  };

  const startSpeechRecognition = () => {
    setIsRecording(true);
    recognition.current.start();
  };

  // function editQuery() {
  //   for (let i = chat.length - 1; i >= 0; i--) {
  //     if (chat[i].role === "user") {
  //       setQuery(chat[i].message);
  //       break; 
  //     }
  //   }
  // }
  

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      const { message } = responseData;
      setChat((prevChat) => [
        ...prevChat,
        {
          role: "Adira",
          message: message,
          profilePic: "https://shorturl.at/bCIX1" // User's profile picture URL
        },
      ]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    } setChat((prevChat) => [
      ...prevChat,
      {
        role: "user",
        message: query,
        profilePic: "https://shorturl.at/zDS28" // User's profile picture URL
      },
    ]);
    setQuery("");
    fetchData();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  return (
    <main>
      <div className={`mb-[10vw]`}>
        {loading ? <p>Loading...</p> : ""}
        {chat.map((message, index) => (
          <div key={index}>
            {message.role === "Adira" && (
              <div className="flex items-center">
                <img src={message.profilePic} alt="Profile Pic" className="w-10 h-10 rounded-full ml-3" />
                <div className={`text-white p-2 rounded-lg max-w-[70%] mb-2 ${
                  message.role === "user"
                    ? "bg-blue-500 self-end text-right ml-auto mr-[5%]"
                    : "bg-yellow-500 self-start ml-[5%] mt-6 "
                }`}>
                  {message.message}
                </div>
              </div>
            )}
            {message.role === "user" && (
              <div className="flex items-center justify-end">
                
                <div className={`text-white p-2 rounded-lg max-w-[70%] mb-2 bg-blue-500 self-end text-right ml-auto mr-[5%]`}>
                  {message.message}
                </div>
                <img src={message.profilePic} alt="Profile Pic" className="w-10 h-10 rounded-full mr-4" />
                <button
                    type="button"
                    onClick={()=>setQuery(message.message)}
                    className="ml-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    ✎
                  </button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full  p-4 border-t "
      >
        <div className="max-w-screen-lg mx-auto flex items-center">
          <label className="flex-grow">
            <span className="sr-only">Enter your query:</span>
            <input
              type="text"
              name="llmQuery"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Please Enter Your Query ..."
            />
          </label>
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Loading..." : "Submit"} {/* Change button text when loading */}
          </button>
          {!isRecording && (
            <button
              type="button"
              onClick={startSpeechRecognition}
              className={`ml-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300
                 `}
            >
              Voice Query
            </button>
          )}
          {isRecording && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="text-white text-center">
                <p>Recording...</p>
                <button
                  type="button"
                  onClick={() => recognition.current.stop()}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Stop Recording
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
