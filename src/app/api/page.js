// "use client";
// import React, { useState, useEffect } from "react";

// export default function GetData() {
//   const [inputValue, setInputValue] = useState("");

//   async function fetchData() {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/");
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   }

//   async function postData(dataToSend) {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: dataToSend }),
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const responseData = await response.json();
//       console.log(responseData);
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleButtonClick = () => {
//     postData(inputValue);
//     setInputValue("");
//   };

//   return (
//     <div>
//       <p>Fetching data from Flask server...</p>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Enter data"
//       />
//       <button onClick={handleButtonClick}>Send Data</button>
//     </div>
//   );
// }
