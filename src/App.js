import React, { useState, useEffect } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "It does not matter how slowly you go as long as you do not stop."
  );
  const [author, setAuthor] = useState("Confucius");

  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#282c34");

  const fetchQuotes = async (url) => {
    const respone = await fetch(url);
    const parsedJSON = await respone.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteDBUrl]);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  // const OURquotesArray = [{quote: "We become what we think about.", author: "Earl Nightingale"},
  // {quote: "It does not matter how slowly you go as long as you do not stop.", author:"Confucius"},
  //{quote: "The question isn’t who is going to let me; it’s who is going to stop me.", author: "Ayn Rand"},

  // {quote: "Do what you can, where you are, with what you have.", author: "Teddy Roosevelt"}]

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <h1>Random Number: {randomNumber}</h1>

          <p id="text">{quote}</p>
          <p id="author">- {author}</p>

          <div className="button">
            <a
              id="tweet-quote"
              style={{ backgroundColor: accentColor }}
              href={encodeURI(
                `https://www.twitter.com/intent/tweet?text=${quote} - ${author}`
              )}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>

          <button
            id="new-quote"
            style={{ backgroundColor: accentColor }}
            onClick={() => getRandomQuote()}
          >
            Generate A Random Quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
