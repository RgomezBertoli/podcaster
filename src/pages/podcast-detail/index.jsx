import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { getDetailPodcast } from "services/apple-connector";

export default function DetailPodcast() {
  const [podcast, setPodcast] = useState([]);
  let params = useParams();

  useEffect(() => {
    const load = async () => {
      try {
        const podcast = await getDetailPodcast(params.id);
        setPodcast(podcast.result);
      } catch {
        setPodcast([]);
      }
    };
    load();
  }, [params.id]);

  return (
    <div className="row">
      <div className="col-6">Detalle del podcast {params.id};</div>
      <div className="col-18">
      <Outlet/>
      </div>
    </div>
  );
}
