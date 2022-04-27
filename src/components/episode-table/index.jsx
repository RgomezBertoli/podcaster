import React from "react";
import { useNavigate } from "react-router-dom";

import milisToDuration from "utils/milis-to-duration";
import { usePodcastContext } from "contexts/podcast-context";

import "./style.scss";

export default function EpisodeTable({ podcastId, episodes }) {
  const navigate = useNavigate();
  const { selectAEpisode } = usePodcastContext();

  const goToEpisode = (ev, ep) => {
    ev.stopPropagation();
    selectAEpisode(ep);
    navigate(`/podcast/${podcastId}/episode/${ep.guid}`);
  };

  const getRow = (ep, index) => {
    const date = new Date(ep.pubDate);
    const duration = milisToDuration(ep.enclosure?.length);

    return (
      <tr className="episode-table__row" key={index}>
        <td onClick={(ev) => goToEpisode(ev, ep)}>
          <a
            className="episode-table__row-title episode-table__row-label"
            href={`/podcast/${podcastId}/episode/${ep.guid}`}
          >
            {ep.title}
          </a>
        </td>
        <td>
          <time
            className="episode-table__row-label"
            dateTime={date.toISOString()}
          >
            {date.toLocaleDateString()}
          </time>
        </td>
        <td>
          <time className="episode-table__row-label" dateTime={duration}>
            {duration}
          </time>
        </td>
      </tr>
    );
  };

  return (
    <table className="episode-table">
      <thead>
        <tr className="episode-table__header">
          <th className="episode-table__head-title episode-table__head-label">
            Title
          </th>
          <th className="episode-table__head-date episode-table__head-label">
            Date
          </th>
          <th className="episode-table__head-duration episode-table__head-label">
            Duration
          </th>
        </tr>
      </thead>
      <tbody>{episodes?.map(getRow)}</tbody>
    </table>
  );
}
