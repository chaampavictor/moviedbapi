import React from "react";

import { useCallback, useState } from "react";

export default function Searchform({ handleSubmit, data }) {
  const [name, setName] = useState("");

  return (
    <div>
      <label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search "
          className="searchbutton"
        />
      </label>
      <input
        onClick={() => handleSubmit(name)}
        type="submit"
        value="Search"
        className="submitbutton"
      />
    </div>
  );
}
