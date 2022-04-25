import React from "react";
import "./style.scss";

export default function PodcastCard({ image, title, author }) {
  return (
    <div className="container-card">
      <img className="container-card-image" src={image} alt={title}/>
      <div className="container-card-content">
        <div className="container-text">
          <h2 className="card-title">{title}</h2>
          <p className="card-author">Author: {author}</p>
        </div>
      </div>
    </div>
  );
}
