import React from "react";

import { useCallback, useState } from "react";

export default function Searchform({ handleSubmit, data }) {
  const [name, setName] = useState("");

  return (
    <div>
      <form onClick={handleSubmit(name)}>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search "
            className="searchbutton"
          />
        </label>
        <input type="submit" value="Search" className="submitbutton" />
      </form>
    </div>
  );
}

// const Counter = ({ parentCallback }) => {
//   const [count, setCount] = useState(0);

//   return (

//   );
// };
