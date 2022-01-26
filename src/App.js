import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import Details from "./components/details";
import { useMediaQuery } from "react-responsive";

const api_key = "872c70d736d1ef4484522f734137927d";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

function App() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [initialdata, setInitialData] = useState([]);
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
      setInitialData(res.data.results);

      setPageNum(res.data.total_pages);

      console.log("get pagination", res.data);
    });
  }, []);
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        vote_average: "vote_average",
        release_date: "release_date",
      };
      const sortProperty = types[type];
      const sorted = [...initialdata].sort(
        (a, b) => new Date(b[sortProperty]) - new Date(a[sortProperty])
      );
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const handlePagination = (data) => {
    console.log("get page count", data.selected);

    const page = data.selected;

    const getPage = api.get("/movie/popular", { params: { api_key, page } });
    getPage.then((res) => {
      setData(res.data.results);
      setInitialData(res.data.results);
      console.log("get the new page", res.data);
    });
  };

  const isBigScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const mobile = useMediaQuery({ query: "(max-width:600px)" });

  return (
    <div className="App">
      <h1 className="HeaderText">Movie DB API</h1>
      <header>
        <div className="filterdiv">
          <p className="sorttext">Sort by:</p>
          <Button
            variant="danger"
            className="filterbutton"
            onClick={() => {
              setSortType("vote_average");

              setCount(count + 1);
            }}
          >
            Top Rated
          </Button>
          <Button
            variant="danger"
            className="filterbutton"
            onClick={() => {
              setSortType("release_date");

              setCount(count + 1);
            }}
          >
            Release Date
          </Button>
          <Button variant="danger" className="filterbutton">
            Number of Clicks:{count}
          </Button>
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
          className="explore-card-columns "
          style={{ marginBottom: "100px" }}
        >
          {data.map((movie) => (
            <div className="item">
              <div class="hover01 column">
                <div>
                  <figure>
                    <img
                      onClick={() => {
                        setShow(true);
                        setDetails(movie);
                        setCount(count + 1);
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

      {isBigScreen && (
        <>
          <ReactPaginate
            nextLabel="Next  "
            onPageChange={handlePagination}
            pageRangeDisplayed={26}
            marginPagesDisplayed={0}
            pageCount={pageNum}
            previousLabel=" Previous"
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
        </>
      )}
      {mobile && (
        <>
          <ReactPaginate
            nextLabel="Next "
            onPageChange={handlePagination}
            pageRangeDisplayed={7}
            marginPagesDisplayed={0}
            pageCount={pageNum}
            previousLabel=" Previous "
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
        </>
      )}
    </div>
  );
}

export default App;
