import React from "react";

import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";

export default function Filterbutton({
  GetMostPopular,
  GetTopRated,
  PlayingNow,
  GetUpcoming,
}) {
  return (
    <>
      <Button
        variant="danger"
        className="filterbutton"
        onClick={GetMostPopular}
      >
        Most Popular
      </Button>
      <Button variant="danger" className="filterbutton" onClick={GetTopRated}>
        Top Rated
      </Button>
      <Button variant="danger" className="filterbutton" onClick={PlayingNow}>
        {" "}
        Now Playing
      </Button>
      <Button variant="danger" className="filterbutton" onClick={GetUpcoming}>
        {" "}
        Upcoming
      </Button>
    </>
  );
}
