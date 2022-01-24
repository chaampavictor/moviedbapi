import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";

export default function Filterbutton({ GetMostPopular, SortByRating }) {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          className="filterbutton"
        >
          Popularity
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => GetMostPopular("ascending")}>
            Ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => GetMostPopular("descending")}>
            Decending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          className="filterbutton"
        >
          Rating
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => SortByRating("ascending")}>
            Ascending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => SortByRating("descending")}>
            Decending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
