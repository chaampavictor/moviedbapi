import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Details({ data }) {
  const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

  return (
    <>
      <Container>
        <Row>
          <Col style={{ height: "600px" }}>
            <div>
              <img
                src={getImage(data.poster_path)}
                alt="Nature"
                style={{ width: "100%", height: "570px", marginTop: "12px" }}
              />
            </div>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h2>{data.original_title}</h2>
                  <p> release date: {data.release_date}</p>
                  <p> popularity: {data.popularity}</p>

                  <p> {data.overview}</p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* <Row>
        <Col>
          <img
            src={getImage(data.poster_path)}
            alt="Nature"
            style={{ width: "100%", height: "466px" }}
          />
        </Col>
      </Row>
     */}
    </>
  );
}
