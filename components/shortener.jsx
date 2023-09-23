"use client";
import React, { useState, useEffect } from "react";

const Shortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [newURL, setURL] = useState("");

  // handleSubmit fn:: to handle shortening of the URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked", e.target);

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
      <h1 className="text-gray-50 text-3xl">Shorten your URL🔻</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <label htmlFor="links">Enter your URL here: </label>
          <input
            className="text-black "
            type="text"
            id="links"
            name="links"
            required
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            type="submit"
            className="select-none rounded-lg bg-green-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            Shorten
          </button>
        </form>
        {newURL && (
          <div className="mt-4">
            <label className="font-bold">Short URL:</label>
            <a href={newURL} target="_blank" rel="noopener noreferrer">
              {getURL(newURL)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortener;
