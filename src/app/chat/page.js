"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GetData() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("Namaskar bheno aur bhaiyo");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const [principleQuery, setPrincipleQuery] = useState("");

  async function fetchData() {
    try {
      console.log("query", query);
      setLoading(true);
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "male" }),
      });
      console.log(response);
      //   const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      const { message } = responseData;
      console.log(message);
      console.log("responsedata", responseData);
      // Update the chat state with the server response
      setChat((prevChat) => [
        ...prevChat,
        {
          role: "Adira",
          message: message, // or adjust according to your server response structure
        },
      ]);
      //   setOutput(JSON.stringify(data));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // postData(inputValue); // If needed
    setInputValue("");
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get("llmQuery");
    console.log(chat);
    // Update the chat state with the user's message
    setChat((prevChat) => [
      ...prevChat,
      {
        role: "user",
        message: newQuery,
      },
    ]);
    // Clear the input field
    setQuery("");
    setPrincipleQuery(
      (e) =>
        "Early Query is " +
        e +
        " and current prompt is" +
        query +
        "Now answer latest prompt with your knowledge and prior prompt"
    );
    // Fetch data based on the user's query
    fetchData();
  }
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <main>
      <div className={`mb-[10vw]`}>
        {loading ? <p>Loading...</p> : ""}
        {/* Display chat messages */}
        {chat.map((message, index) => (
          <div
            key={index}
            className={`text-white p-2 rounded-lg max-w-[70%] mb-2 ${
              message.role === "user"
                ? "bg-blue-500 self-end text-right ml-auto mr-[5%]"
                : "bg-yellow-500 self-start ml-[5%] "
            }`}
          >
            {message.message}
          </div>
        ))}
        {/* Create a reference to the last message to scroll into view */}
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
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

// import React, { useState, useEffect } from "react";

// export default function GetData() {
//         const [inputValue, setInputValue] = useState("");
//         const [query, setQuery] = useState("");
//         const [output, setOutput] = useState("Namaskar bheno aur bhaiyo");
//         const [loading, setLoading] = useState(false);
//         const [chat, setChat] = useState([]);
//         const messagesEndRef = useRef(null);
//         const [principleQuery, setPrincipleQuery] = useState("");

//         async function fetchData() {
//             try {
//             const command = JSON.stringify({ QUERY: query });
//             setLoading(true);
//             const response = await fetch("http://localhost:5000/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ query: dataToSend }),
//                 });
//                 const data = await response.json();
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 console.log(data);

//             // Update the chat state with the server response
//             setChat((prevChat) => [
//                 ...prevChat,
//                 {
//                     role: "Adira",
//                 message: data.RESULT,
//             },
//             ]);

//             setOutput(JSON.stringify(data));
//             }
//         catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//         }  finally {
//             setLoading(false);
//         }
//         }
//         // async function postData(dataToSend) {
//         //     try {
//         //     const response = await fetch("http://127.0.0.1:5000/", {
//         //         method: "POST",
//         //         headers: {
//         //         "Content-Type": "application/json",
//         //         },
//         //         body: JSON.stringify({ query: dataToSend }),
//         //     });
//         //     if (!response.ok) {
//         //         throw new Error("Network response was not ok");
//         //     }
//         //     const responseData = await response.json();
//         //     console.log(responseData);
//         //     } catch (error) {
//         //     console.error("There was a problem with the fetch operation:", error);
//         //     }
//         // }

//         useEffect(() => {
//             fetchData();
//         }, []);

//         const handleInputChange = (e) => {
//             setInputValue(e.target.value);
//         };

//         const handleButtonClick = () => {
//             postData(inputValue);
//             setInputValue("");
//         };
//         function handleSubmit(e) {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newQuery = formData.get("userquery");

//             // Update the chat state with the user's message
//             setChat((prevChat) => [
//               ...prevChat,
//               {
//                   role: "user",
//                   message: newQuery,
//                 },
//             ]);
//             // Clear the input field
//             setQuery("");
//             setPrincipleQuery(
//                 (e) =>
//                 "Early Query is " +
//                 e +
//                 " and current prompt is" +
//                 query +
//                 "Now answer latest prompt with your knowledge and prior prompt"
//             );
//             // Fetch data based on the user's query
//             fetchData();
//         }
//           return (
//                 <main>
//                   <div className={`mb-[10vw]`}>
//                     {loading ? <p>Loading...</p> : ""}

//                     {/* Display chat messages */}
//                     {chat.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`text-white p-2 rounded-lg max-w-[70%] mb-2 ${
//                           message.role === "user"
//                             ? "bg-blue-500 self-end text-right ml-auto mr-[5%]"
//                             : "bg-yellow-500 self-start ml-[5%] "
//                         }`}
//                       >
//                         {message.message}
//                       </div>
//                     ))}
//                     {/* Create a reference to the last message to scroll into view */}
//                     <div ref={messagesEndRef} />
//                   </div>

//                   <form
//                     onSubmit={handleSubmit}
//                     className="fixed bottom-0 left-0 w-full  p-4 border-t "
//                     >
//                     <div className="max-w-screen-lg mx-auto flex items-center">
//                       <label className="flex-grow">
//                         <span className="sr-only">Enter your query:</span>
//                         <input
//                           type="text"
//                           name="llmQuery"
//                           onChange={(e) => setQuery(e.target.value)}
//                           value={query}
//                           className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                           placeholder="Please Enter Your Query ..."
//                         />
//                       </label>
//                       <button
//                         type="submit"
//                         className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 </main>
//               );
// }

//               // async function fetchData() {
//               //     try {
//               //     const response = await fetch("http://127.0.0.1:5000/");
//               //     if (!response.ok) {
//               //         throw new Error("Network response was not ok");
//               //     }
//               //     const data = await response.json();
//               //     console.log(data);
//               //     } catch (error) {
//               //     console.error("There was a problem with the fetch operation:", error);
//               //     }
//               // }
