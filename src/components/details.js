import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMediaQuery } from "react-responsive";

export default function Details({ data }) {
  const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;
  console.log("get the movie details", data);
  const isBigScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const mobile = useMediaQuery({ query: "(max-width:600px)" });
  return (
    <>
      <Container className="parentmodaldiv">
        {mobile && (
          <>
            <Row>
              <Col>
                <div>
                  <img
                    className="detailimage"
                    src={getImage(data.poster_path)}
                    alt="Nature"
                  />
                </div>
                <br />
                <h3
                  className="textstyles"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {data.original_title}
                </h3>
                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  release date: {data.release_date}
                </p>

                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  Rating: {data.vote_average}
                </p>
                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  popularity: {data.popularity}
                </p>
              </Col>
              <Col>
                <br />
                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  {data.overview}
                </p>
              </Col>
            </Row>
          </>
        )}

        {isBigScreen && (
          <>
            <Row>
              <Col>
                <div>
                  <img
                    className="detailimage"
                    src={getImage(data.poster_path)}
                    alt="Nature"
                  />
                </div>
              </Col>
              <Col>
                <h3
                  className="textstyles"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {data.original_title}
                </h3>
                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  release date: {data.release_date}
                </p>

                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  Rating: {data.vote_average}
                </p>

                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  popularity: {data.popularity}
                </p>

                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  {data.overview}
                </p>
                <p className="textstyles" style={{ color: "white" }}>
                  {" "}
                  {data.overview}
                </p>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
