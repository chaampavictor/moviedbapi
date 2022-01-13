import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    console.log("get data");
    fetch("https://movie-database-imdb-alternative.p.rapidapi.com/", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f75ba86213mshe45f2a229257e13p1792ccjsn23ed0d078845",
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.url);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
