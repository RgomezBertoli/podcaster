import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Card from "components/podcast-card";
import Searcher from "components/searcher";

import "./style.scss";
import { useLoaderContext } from "contexts/loader-context";
import { usePodcastContext } from "contexts/podcast-context";

const PodcastList = () => {
  const navigate = useNavigate();
  const { setLoader } = useLoaderContext();
  const { podcastList, selectAPodcast, getAllPodcast } = usePodcastContext();

  const [searchText, setSearch] = useState("");

  const viewList = useMemo(() => {
    if (searchText) {
      return podcastList.filter((podcast) =>
        podcast.title.label
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase())
      );
    }

    return podcastList;
  }, [podcastList, searchText]);

  useEffect(() => {
    const load = async () => {
      setLoader(true);
      try {
        await getAllPodcast();
      } finally {
        setLoader(false);
      }
    };
    load();
  }, []);

  const onClickCard = (podcast) => {
    selectAPodcast(podcast)
    navigate(`/podcast/${podcast["id"].attributes["im:id"]}`);
  };

  const renderListElement = (podcast, index) => {
    const images = podcast["im:image"];
    const lastImage = images[images.length - 1].label;

    return (
      <div
        key={index}
        className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        onClick={() => onClickCard(podcast)}
      >
        <Card
          image={lastImage}
          title={podcast.title.label}
          author={podcast["im:artist"].label}
        />
      </div>
    );
  };

  const onSearch = (filterText) => {
    setSearch(filterText);
  };

  return (
    <section>
      <div className="row searcher-container">
        <Searcher total={viewList.length} onSearch={onSearch} />
      </div>
      <div className="row">
        {viewList.length !== 0 ? viewList.map(renderListElement) : ""}
      </div>
    </section>
  );
};

export default PodcastList;
