import React from "react";

import "./style.scss";

export default function PodcastSummary({ image, title, author, description }) {
  return (
    <div className="podcast-summary">
      <div className="podcast-summary__image-container">
        <img className="podcast-summary__image" src={image} alt={title} />
      </div>
      <div className="podcast-summary__authority">
        <p className="podcast-summary__title">{title}</p>
        <p className="podcast-summary__author">By {author}</p>
      </div>
      <div className="podcast-summary__description-cnt">
        <p className="podcast-summary__description-title">Description</p>
        <p className="podcast-summary__description">{description}</p>
      </div>
    </div>
  );
}
