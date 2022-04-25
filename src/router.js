import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import PodcastList from "pages/podcast-list";
import PodcastDetail from "pages/podcast-detail";
import EpisodeList from "pages/podcast-detail/episode-list";
import EpisodeDetail from "pages/podcast-detail/episode-detail";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PodcastList />} />
          <Route path="podcast/:id" element={<PodcastDetail />}>
            <Route index element={<EpisodeList />} />
            <Route path="episode/:episodeId" element={<EpisodeDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
