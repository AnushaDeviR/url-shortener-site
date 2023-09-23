"use client";
import React, { useState, useEffect } from "react";

const Shortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [newURL, setURL] = useState("");

  // handleSubmit fn:: to handle shortening of the URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle response:
    try {
      const response = await fetch("/api/sb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: originalUrl }),
      });
      const data = await response.json();
      setURL(data.newURL);
    } catch (error) {
      console.error(error);
    }
  };

  const getURL = (url) => {
    if (url.includes("https://") || url.includes("http://")) {
      return url;
    } else {
      return "https://" + url;
    }
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <h1 className="text-gray-50 text-3xl mt-10">Shorten your URL🔻</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <label htmlFor="links" className="text-xl">
            Enter URL to <i>minify</i> :
          </label>
          <input
            className="url-field"
            type="text"
            id="links"
            name="links"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button type="submit" className="shorten-btn">
            Shorten
          </button>
        </form>
        {newURL && (
          <div className="mini-url">
            <div>
              <label>Minified URL 🔗</label>
              <a
                href={newURL}
                target="_blank"
                rel="noopener noreferrer"
                className="url-styling"
              >
                {getURL(newURL)}
              </a>
            </div>
            <div>
              <p
                onClick={() => {
                  navigator.clipboard.writeText(newURL);
                  alert("URL copied: " + newURL);
                }}
                className="text-sm cursor-pointer mt-4"
              >
                📋<i>Click to copy</i>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortener;
