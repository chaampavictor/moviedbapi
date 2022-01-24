import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Details({ data }) {
  const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;
  console.log("get the movie details", data);

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
                  <p style={{ color: "white" }}> Status: {data.status}</p>
                  <p style={{ color: "white" }}> Rating: {data.vote_average}</p>
                  <p style={{ color: "white" }}> Budget: ${data.budget}</p>
                  <p style={{ color: "white" }}>
                    {" "}
                    Runtime: {data.runtime} Minutes
                  </p>

                  <p style={{ color: "white" }}>
                    {" "}
                    Release Date: {data.release_date}
                  </p>
                  <p style={{ color: "white" }}>
                    {" "}
                    Popularity: {data.popularity}
                  </p>

                  <p style={{ color: "white", marginBottom: "0px" }}>
                    Production Companies:
                  </p>
                  <div style={{ display: "flex" }}>
                    {data.production_companies.map((company) => (
                      <div>
                        <p
                          style={{
                            color: "white",
                            fontSize: "14px",
                            marginLeft: "2px",
                            marginRight: "2px",
                          }}
                        >
                          {" "}
                          {company.name}
                        </p>
                      </div>
                    ))}
                  </div>

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
