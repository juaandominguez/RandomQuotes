import React, { useState, useEffect } from "react"
import axios from "axios";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  
  const getRandomColor = () => {
      return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
  }
  const getQuote = async () => {
      try {
          setLoading(true);
          const response = await axios.get("https://api.quotable.io/random");
          if (response.data) {
              setQuote(response.data.content);
              setAuthor(response.data.author);
              setLoading(false);
          }
      } catch (err) {
          setLoading(false);
      }
  }
  const [color, setColor] = useState(getRandomColor());
  useEffect(() => {
      setColor(getRandomColor());
      getQuote();
  }, [])
  
  return (
    <div className="absolute min-w-full min-h-full transition-all duration-1000"
    style={{backgroundColor: color}}>
      <h1
      style={{color: color}}
      className="mt-20 text-3xl rounded-md bg-white mx-52 p-5 transition duration-1000 text-center shadow-md hover:shadow-2xl xl:mx-96"
      >
        Made by Juan Dominguez
        <a href="https://www.linkedin.com/in/juandominguezrodriguez/" className="p-0">
          <LinkedInIcon
          className="ml-5" 
          sx={{fontSize: 38}}
          />
        </a>
        <a href="https://github.com/juaandominguez" className="p-0">
          <GitHubIcon
          className="ml-5" 
          sx={{fontSize: 38}}
          />
        </a>
      </h1>
      <div id="quote-box" className="flex flex-col justify-center rounded-md text-black border-white border-4 content-center py-10 bg-white shadow-md hover:shadow-2xl m-32 transition duration-1000 md:m-52 xl:mt-64 xl:mx-96">
        <div>
          {quote && (
            <div id="text">
              <p 
              style={{color: color}}
              className="mx-32 text-3xl transition-all duration-1000"
              ><FormatQuoteIcon sx={{fontSize: 40}}/>{quote}</p>
            </div>
          )}
        </div>
        <div id="author">
          <p className={`mt-5 text-right mr-10 transition duration-1000`}
          style={{color: color}}>
            -{author}
          </p>
        </div>
        <div className="flex flex-row mt-16 mx-2 justify-between">
          <a
          style={{backgroundColor: color}} 
          className="cursor-pointer py-3 px-5 rounded-md text-center ml-10 mr-5 justify-start transition duration-1000 text-white w-16"
          id="tweet-quote"   
          href={`https://www.twitter.com/intent/tweet?hashtags=quotes&text="${quote}\n- ${author}"`}>
            <TwitterIcon />
          </a>
        <button id="new-quote"
        className="cursor-pointer px-4 py-3 rounded-md text-center justify-end transition duration-1000 text-white mr-10"
        style={{backgroundColor: color}}
        onClick={() => {
          setColor(getRandomColor())
          getQuote();
        }}
        >New Quote
        </button>
        </div>
      </div>
    </div>
  )
}
