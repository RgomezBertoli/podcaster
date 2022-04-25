import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getListConfiguration } from "services/apple-connector";

import Card from "components/podcast-card";

const PodcastList = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

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

  const listCards = () => {
    return (
      list.length !== 0 &&
      list.map((im, id) => (
        <div
          key={id}
          className="col-3"
          onClick={() => onClickCard(im["id"].attributes["im:id"])}
        >
          <Card
            image={im["im:image"][0].label}
            author={im["im:artist"].label}
            title={im.title.label}
          ></Card>
        </div>
      ))
    );
  };

  return <div className="row">{listCards()}</div>;
};

export default PodcastList;
