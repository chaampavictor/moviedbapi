import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const api_key = "872c70d736d1ef4484522f734137927d";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const api = axios.create({ baseURL: BASE_URL });

  const getUpcoming = api.get("/movie/popular", { params: { api_key } });
  const getgenre = api.get("/genre/movie/list", { params: { api_key } });

  useEffect(() => {
    getUpcoming.then((res) => {
      setData(res.data.results);
    });

    getgenre.then((res) => {
      // setData(res.data.results);
      console.log("get genre", res);
    });
  }, []);

  const GetMostPopular = () => {
    setLoading(true);
    const toprated = api.get("/movie/popular", { params: { api_key } });
    toprated.then((res) => {
      console.log("get popular", res.data.results);
      setData(res.data.results);
      setLoading(false);
    });
  };

  const GetTopRated = (res) => {
    setLoading(true);

    const toprated = api.get("/movie/top_rated", { params: { api_key } });
    toprated.then((res) => {
      console.log("get top rated", res.data.results);
      setData(res.data.results);
      setLoading(false);
    });
  };

  const GetPlaying = () => {
    setLoading(true);

    const latest = api.get("movie/now_playing", { params: { api_key } });
    latest.then((res) => {
      console.log("now_playing movies", res.data);
      setData(res.data.results);
      setLoading(false);
    });
  };

  const GetUpcoming = () => {
    setLoading(true);

    const latest = api.get("movie/upcoming", { params: { api_key } });
    latest.then((res) => {
      console.log("latest movies", res.data);
      setData(res.data.results);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Movie DB API</h1>
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? GetMostPopular : null}
          >
            {isLoading ? "Loading…" : "Most Popular"}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? GetTopRated : null}
          >
            {isLoading ? "Loading…" : "Top Rated test"}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? GetPlaying : null}
          >
            {isLoading ? "Loading…" : "Now Playing"}
          </Button>

          <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? GetUpcoming : null}
          >
            {isLoading ? "Loading…" : "Upcoming"}
          </Button>
        </div>

        <div
          className="explore-card-columns  container-fluid"
          style={{ marginBottom: "100px" }}
        >
          {data.map((movie) => (
            <div className="item">
              <img
                src={getImage(movie.poster_path)}
                alt="poster"
                className="image-item"
              />
              {/* <p>{movie.original_title}</p> */}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
