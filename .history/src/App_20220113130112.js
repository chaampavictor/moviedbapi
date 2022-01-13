import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Search from "./search";
const api_key = "872c70d736d1ef4484522f734137927d";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function App() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);

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
    const toprated = api.get("/movie/popular", { params: { api_key } });
    toprated.then((res) => {
      console.log("get popular", res.data.results);
      setData(res.data.results);
    });
  };

  const GetTopRated = (res) => {
    const toprated = api.get("/movie/top_rated", { params: { api_key } });
    toprated.then((res) => {
      console.log("get top rated", res.data.results);
      setData(res.data.results);
    });
  };

  const GetPlaying = () => {
    const latest = api.get("movie/now_playing", { params: { api_key } });
    latest.then((res) => {
      console.log("now_playing movies", res.data);
      setData(res.data.results);
    });
  };

  const GetUpcoming = () => {
    const latest = api.get("movie/upcoming", { params: { api_key } });
    latest.then((res) => {
      console.log("latest movies", res.data);
      setData(res.data.results);
    });
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    const query = "avengers";
    const latest = api.get("search/movie", { params: { api_key, query } });
    latest.then((res) => {
      setData(res.data.results);
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
            variant="danger"
            className="filterbutton"
            onClick={GetMostPopular}
          >
            Most Popular
          </Button>
          <Button
            variant="danger"
            className="filterbutton"
            onClick={GetTopRated}
          >
            Top Rated
          </Button>
          <Button
            variant="danger"
            className="filterbutton"
            onClick={GetPlaying}
          >
            {" "}
            Now Playing
          </Button>
          <Button
            variant="danger"
            className="filterbutton"
            onClick={GetUpcoming}
          >
            {" "}
            Upcoming
          </Button>
        </div>
        <Modal
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Row>
            <Col>
              <img
                src={getImage(details.poster_path)}
                alt="Nature"
                style={{ width: "100%", height: "466px" }}
              />
            </Col>
          </Row>
          <Container>
            <Row>
              <Col>
                <h4>{details.original_title}</h4>
                <p> release date: {details.release_date}</p>
                <p> popularity: {details.popularity}</p>

                <p> {details.overview}</p>
              </Col>
            </Row>
          </Container>
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
                      onClick={() => {
                        console.log("record being passed", movie);
                        setShow(true);
                        setDetails(movie);
                      }}
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
