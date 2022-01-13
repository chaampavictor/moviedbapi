import React, { useState } from "react";
import "../App.css";

export function Search(searchMovie) {
  const [name, setName] = useState("");

  const handleSubmit = (searchMovie, e) => {
    e.preventDefault();
    searchMovie(name);
  };
  return (
    <form
      onClick={() => {
        setName(name);
        parentCallback(name);
      }}
    >
      <label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Title "
          className="searchbutton"
        />
      </label>
      <input type="submit" value="Search" className="submitbutton" />
    </form>
  );
}
