import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getListConfiguration } from "services/apple-connector";

import Card from "components/podcast-card";
import Searcher from "components/searcher";

import "./style.scss";

const PodcastList = () => {
  const [list, setList] = useState([]);
  const [searchText, setSearch] = useState("");
  const navigate = useNavigate();

  const viewList = useMemo(() => {
    if (searchText) {
      return list.filter((podcast) =>
        podcast.title.label
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase())
      );
    }

    return list;
  }, [list, searchText]);

  useEffect(() => {
    const load = async () => {
      try {
        const listAux = await getListConfiguration();
        setList(listAux.feed.entry);
      } catch {
        setList([]);
      }
    };
    load();
  }, []);

  const onClickCard = (id) => {
    navigate("/podcast/" + id);
  };

  const renderListElement = (podcast, index) => {
    const images = podcast["im:image"];
    const lastImage = podcast["im:image"][images.length - 1].label;

    return (
      <div
        key={index}
        className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        onClick={() => onClickCard(podcast["id"].attributes["im:id"])}
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
