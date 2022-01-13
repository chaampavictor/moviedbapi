import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Details({ data }) {
  return (
    <>
      <Row>
        <Col>
          <img
            src={data.poster_path}
            alt="Nature"
            style={{ width: "100%", height: "466px" }}
          />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <h4>{data.original_title}</h4>
            <p> release date: {data.release_date}</p>
            <p> popularity: {data.popularity}</p>

            <p> {data.overview}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
