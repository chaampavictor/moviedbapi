import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import Searchform from "./components/searchform.js";
import Filterbutton from "./components/filterbutton";
import ReactPaginate from "react-paginate";
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
  const [pageNum, setPageNum] = useState(0);
  const handleClose = () => setShow(false);

  const api = axios.create({ baseURL: BASE_URL });

  const getUpcoming = api.get("/movie/popular", { params: { api_key } });

  useEffect(() => {
    getUpcoming.then((res) => {
      setData(res.data.results);
      setPageNum(res.data.total_pages);

      console.log("get pagination", res.data);
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

  const getinfo = (value) => () => {
    const getmoviedata = api.get(`movie/${value.id}`, {
      params: { api_key },
    });
    getmoviedata.then((res) => {
      console.log("get the data", res.data);
      setDetails(res.data);
      setCount(count + 1);
      setShow(true);
    });
  };

  const handlePagination = (data) => {
    console.log("get page count", data.selected);

    const page = data.selected;

    const getPage = api.get("/movie/popular", { params: { api_key, page } });
    getPage.then((res) => {
      setData(res.data.results);
    });
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
                      onClick={getinfo(movie)}
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
      <ReactPaginate
        nextLabel="Next Page "
        onPageChange={handlePagination}
        pageRangeDisplayed={10}
        marginPagesDisplayed={2}
        pageCount={pageNum}
        previousLabel=" Previous Page"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default App;
