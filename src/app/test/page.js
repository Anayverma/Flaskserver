"use client";
// pages/translateText.js

import React, { useState } from 'react';
import translate from 'translate';

const TranslateText = () => {
  const [translatedText, setTranslatedText] = useState('');

  const translateTextToHindi = async () => {
    translate.engine = 'deepl'; // Use DeepL engine
    translate.key = process.env.DEEPL_KEY; // Set your DeepL API key here

    try {
      const text = await translate('Hello world', 'hi'); // Translate 'Hello world' to Hindi
      setTranslatedText(text);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div>
      <h1>Translate Text to Hindi</h1>
      <button onClick={translateTextToHindi}>Translate</button>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslateText;
