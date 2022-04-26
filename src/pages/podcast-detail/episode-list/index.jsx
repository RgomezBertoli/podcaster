import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";

export default function EpisodeList() {
  let params = useParams();
  const { setLoader } = useLoaderContext();

  const { podcastEpisodes, podcastInfo, getPodcastAndEpisodesById } = usePodcastContext();

  useEffect(() => {
    const load = async () => {
      setLoader(true);
      try {
        await getPodcastAndEpisodesById(params.id)
      } finally {
        setLoader(false);
      }
    }

    load();
  }, [params.id]);


  return (
    <section>
      <header>
        <p>Episodes: {podcastInfo?.trackCount}</p>
      </header>
      <div>
        <p>{podcastEpisodes}</p>
      </div>
    </section>
  );
}
