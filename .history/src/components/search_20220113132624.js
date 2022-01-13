import React, { useState } from "react";
import "../App.css";

export function Search(parentCallback) {
  const [name, setName] = useState("");

  const handleSubmit = (parentCallback, e) => {
    e.preventDefault();
    parentCallback(name);
  };
  return (
    <form onSubmit={handleSubmit}>
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
