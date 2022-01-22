import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import Searchform from "./components/searchform.js";
import Filterbutton from "./components/filterbutton";

import Details from "./components/details";
import { useCallback } from "react";
const api_key = "872c70d736d1ef4484522f734137927d";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function App() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const handleClose = () => setShow(false);

  const api = axios.create({ baseURL: BASE_URL });

  const getUpcoming = api.get("/movie/popular", { params: { api_key } });

  useEffect(() => {
    getUpcoming.then((res) => {
      setData(res.data.results);
    });
  }, []);

  const GetMostPopular = () => {
    setCount(count + 1);

    const toprated = api.get("/movie/popular", { params: { api_key } });
    toprated.then((res) => {
      console.log("get popular", res.data.results);
      setData(res.data.results);
    });
  };

  const GetTopRated = (res) => {
    setCount(count + 1);

    const toprated = api.get("/movie/top_rated", { params: { api_key } });
    toprated.then((res) => {
      console.log("get top rated", res.data.results);
      setData(res.data.results);
    });
  };

  const PlayingNow = () => {
    setCount(count + 1);
    const name = "now_playing";
    const latest = api.get(`movie/${name}`, { params: { api_key } });
    latest.then((res) => {
      console.log("now_playing movies", res.data);
      setData(res.data.results);
    });
  };

  const GetUpcoming = () => {
    setCount(count + 1);

    const latest = api.get("movie/upcoming", { params: { api_key } });
    latest.then((res) => {
      console.log("latest movies", res.data);
      setData(res.data.results);
    });
  };

  const searchMovie = (name) => {
    setCount(count + 1);

    console.log(name);
    const query = name;
    const latest = api.get("search/movie", { params: { api_key, query } });
    latest.then((res) => {
      setData(res.data.results);
    });
  };

  const gotomovie = (value) => () => {
    const id = value.id;
    const moviedetails = api.get("search/movie", { params: { api_key, id } });
    console.log("get the movie", moviedetails);
  };

  return (
    <div className="App">
      <h1 className="HeaderText">Movie DB API</h1>
      <header>
        <div className="filterdiv">
          {/**/}
          <Button variant="danger" className="filterbutton">
            Number of Clicks:{count}
          </Button>
          <Filterbutton
            PlayingNow={PlayingNow}
            GetUpcoming={GetUpcoming}
            GetTopRated={GetTopRated}
            GetMostPopular={GetMostPopular}
          />

          <Searchform handleSubmit={searchMovie} />
        </div>
        <Modal
          aria-labelledby="example-custom-modal-styling-title"
          centered
          size="lg"
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Details data={details} />
        </Modal>
        <div
          className="explore-card-columns  container-fluid"
          style={{ marginBottom: "100px" }}
        >
          {data.map((movie) => (
            <div className="item">
              <div class="hover01 column">
                <div>
                  <figure>
                    <img
                      onClick={gotomovie(movie)}
                      // onClick={() => {
                      //   // setShow(true);
                      //   setDetails(movie);
                      //   gotomovie();
                      //   // setCount(count + 1);
                      // }}
                      src={getImage(movie.poster_path)}
                      alt="poster"
                      className="image-item"
                    />
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
