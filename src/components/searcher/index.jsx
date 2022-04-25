import React from "react";

import "./style.scss";

export default function Searcher({ total, onSearch }) {
  const onKeyUp = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="searcher">
      <span className="searcher__total">{total}</span>
      <input
        type="text"
        onKeyUp={onKeyUp}
        className="searcher__input"
        placeholder="Filter Podcast..."
      />
    </div>
  );
}
