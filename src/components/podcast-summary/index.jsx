import { usePodcastContext } from "contexts/podcast-context";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

export default function PodcastSummary({ id, image, title, author, description }) {
  const navigate = useNavigate();
  const { selectAEpisode } = usePodcastContext();

  const goToDetail = () => {
    selectAEpisode();
    navigate(`/podcast/${id}`);
  }

  return (
    <div className="podcast-summary">
      <div className="podcast-summary__image-container">
        <img className="podcast-summary__image" src={image} alt={title} onClick={goToDetail}/>
      </div>
      <div className="podcast-summary__authority">
        <h2 className="podcast-summary__title" onClick={goToDetail}>{title}</h2>
        <p className="podcast-summary__author" onClick={goToDetail}>By {author}</p>
      </div>
      <div className="podcast-summary__description-cnt">
        <p className="podcast-summary__description-title">Description:</p>
        <p className="podcast-summary__description">{description}</p>
      </div>
    </div>
  );
}
