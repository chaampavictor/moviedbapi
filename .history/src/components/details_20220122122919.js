import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Details({ data }) {
  const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

  return (
    <>
      <Container style={{ height: "600px", background: "#2a2b2e" }}>
        <Row>
          <Col>
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
                  <h3 style={{ color: "white" }}>{data.original_title}</h3>
                  <p style={{ color: "white" }}>
                    {" "}
                    release date: {data.release_date}
                  </p>
                  <p style={{ color: "white" }}>
                    {" "}
                    popularity: {data.popularity}
                  </p>

                  <p style={{ color: "white" }}> {data.overview}</p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
