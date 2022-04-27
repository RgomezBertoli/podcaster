import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";
import EpisodeTable from "components/episode-table";

import "./style.scss";

export default function EpisodeList() {
  let params = useParams();
  const { setLoader } = useLoaderContext();

  const { podcastEpisodes, podcastInfo, getPodcastAndEpisodesById } =
    usePodcastContext();

  useEffect(() => {
    const load = async () => {
      setLoader(true);
      try {
        await getPodcastAndEpisodesById(params.id);
      } finally {
        setLoader(false);
      }
    };

    load();
  }, [params.id]);

  return (
    <section>
      <header className="episode-list__episodes-cnt">
        <p className="episode-list__episodes-label">Episodes: {podcastInfo?.trackCount}</p>
      </header>
      <div className="episode-list__table-cnt">
        <EpisodeTable podcastId={params.id} episodes={podcastEpisodes} />
      </div>
    </section>
  );
}
