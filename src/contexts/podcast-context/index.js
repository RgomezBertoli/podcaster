import React, { useContext, createContext, useState } from "react";

import {
  getListConfiguration,
  getDetailPodcast,
} from "services/apple-connector";

import fetchXMLWithCache from "services/fetch-xml-with-cache";

const context = createContext({
  podcastList: [],
  podcastInfo: undefined,
  selectedPodcast: undefined,
  setAPodcast: null,
  getAllPodcast: null,
  getEpisodeInfo: null,
  getAllAndSelectPodcast: null,
  getPodcastAndEpisodesById: null,
});
context.displayName = "PodcastContext";

export function usePodcastContext() {
  return useContext(context);
}

export default function PodcastContext({ children }) {
  const [podcastInfo, setPodcastInfo] = useState();
  const [podcastList, setPodcastList] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState();
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);

  const getAllPodcast = async () => {
    try {
      const listAux = await getListConfiguration();
      setPodcastList(listAux.feed.entry);
    } catch {
      setPodcastList([]);
    }
  };

  const getAllAndSelectPodcast = async (id) => {
    try {
      const listAux = await getListConfiguration();
      const selected = listAux.feed.entry.find((podcast)=> id === podcast["id"].attributes["im:id"]);
      setPodcastList(listAux.feed.entry);
      setSelectedPodcast(selected);
    } catch {
      setPodcastList([]);
      setSelectedPodcast();
    }
  };

  const getPodcastAndEpisodesById = async (id) => {
    try {
      const podcastDetail = await getDetailPodcast(id);
      const detail = podcastDetail.results[0];

      await getEpisodeInfo(detail.feedUrl);
      setPodcastInfo(detail);
    } catch {
      setPodcastInfo();
    }
  }

  const getEpisodeInfo = async (url) => {
    try {
      const episodeInfo = await fetchXMLWithCache(url);
      setPodcastEpisodes(episodeInfo.items);
    } catch {
      setPodcastEpisodes();
    }
  }

  const selectAPodcast = (podcast) => {
    setSelectedPodcast(podcast);
  };

  return (
    <context.Provider
      value={{
        podcastInfo,
        podcastList,
        podcastEpisodes,
        selectedPodcast,
        getAllPodcast,
        selectAPodcast,
        getEpisodeInfo,
        getAllAndSelectPodcast,
        getPodcastAndEpisodesById,
      }}
    >
      {children}
    </context.Provider>
  );
}
