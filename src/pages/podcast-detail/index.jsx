import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";
import PodcastSummary from "components/podcast-summary";

export default function DetailPodcast() {
  let params = useParams();
  const { setLoader } = useLoaderContext();
  const { selectedPodcast, getAllAndSelectPodcast } = usePodcastContext();

  useEffect(() => {
    const load = async () => {
      setLoader(true);
      if (!selectedPodcast) {
        try {
          await getAllAndSelectPodcast(params.id);
        } finally {
          setLoader(false);
        }
      }
    };
    load();
  }, [params.id]);

  const images = selectedPodcast?.["im:image"];
  const lastImage = images?.[images.length - 1].label;

  return (
    <div className="row">
      <aside className="col-2">
        <PodcastSummary
          image={lastImage}
          title={selectedPodcast?.title.label}
          author={selectedPodcast?.["im:artist"].label}
          description={selectedPodcast?.summary.label}
        />
      </aside>
      <div className="col-10">
        <Outlet />
      </div>
    </div>
  );
}
