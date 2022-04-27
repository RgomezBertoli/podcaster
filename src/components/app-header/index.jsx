import React from "react";
import { useNavigate } from "react-router-dom";

import Loader from "components/loader";
import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";

import "./style.scss";

export default function AppHeader() {
  const navigate = useNavigate();
  const { isLoading } = useLoaderContext();
  const { clearPodcast } = usePodcastContext();

  const onClickHeader = () => {
    navigate("/");
    clearPodcast();
  };

  return (
    <header className="app-header">
      <h1 className="app-header__title" onClick={onClickHeader}>
        Podcaster
      </h1>
      {isLoading ? <Loader /> : ""}
    </header>
  );
}
