import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const api_key = "872c70d736d1ef4484522f734137927d";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function App() {
  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: BASE_URL });

  const getUpcoming = api.get("/movie/popular", { params: { api_key } });

  useEffect(() => {
    getUpcoming.then((res) => {
      setData(res.data.results);
    });
  }, [getUpcoming]);

  return (
    <div className="App">
      <h1>Movie DB API</h1>
      <header>
        <div className="grid">
          <button>Most Popular</button>
          <button>Top Rated</button>
          <button> Latest</button>
          <button> Upcoming</button>
        </div>

        <div
          className="explore-card-columns  container-fluid"
          style={{ marginBottom: "100px" }}
        >
          {data.map((movie) => (
            <div className="item">
              <img src={getImage(movie.poster_path)} alt="poster" />
              <p>{movie.original_title}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
