import React, { useEffect } from "react";
import sanitize from "sanitize-html";
import { useParams } from "react-router-dom";

import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";

import "./style.scss";

export default function EpisodeDetail() {
  let params = useParams();
  const { setLoader } = useLoaderContext();

  const { selectedEpisode, getPodcastEpisodesByIdAndSelectOne } =
    usePodcastContext();

  useEffect(() => {
    const load = async () => {
      setLoader(true);
      try {
        if (!selectedEpisode || selectedEpisode.guid !== params.episodeId) {
          await getPodcastEpisodesByIdAndSelectOne(params.id, params.episodeId);
        }
      } finally {
        setLoader(false);
      }
    };

    load();
  }, [params.id, params.episodeId]);

  const sanitized = sanitize(selectedEpisode?.["content:encoded"]);

  return (
    <div className="episode-detail">
      <h3 className="episode-detail__title">{selectedEpisode?.title}</h3>
      <div
        className="episode-detail__description"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
      <audio
        className="episode-detail__audio"
        controls
        src={selectedEpisode?.enclosure.url}
      />
    </div>
  );
}
