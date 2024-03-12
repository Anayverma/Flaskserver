"use client";
import React, { useEffect } from "react";

export default function GetData() {
  async function fetchData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
        const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>Fetching data from Flask server...</p>
    </div>
  );
}
