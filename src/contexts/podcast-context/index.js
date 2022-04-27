import React, { useContext, createContext, useState } from "react";

import {
  getListConfiguration,
  getDetailPodcast,
} from "services/apple-connector";

import fetchXMLWithCache from "services/fetch-xml-with-cache";

const context = createContext({
  podcastInfo: undefined,
  podcastList: [],
  podcastEpisodes: [],
  selectedPodcast: undefined,
  selectedEpisode: undefined,
  clearPodcast: null,
  getAllPodcast: null,
  selectAPodcast: null,
  selectAEpisode: null,
  getEpisodeInfo: null,
  getAllAndSelectPodcast: null,
  getPodcastAndEpisodesById: null,
  getPodcastEpisodesByIdAndSelectOne: null,
});
context.displayName = "PodcastContext";

export function usePodcastContext() {
  return useContext(context);
}

export default function PodcastContext({ children }) {
  const [podcastInfo, setPodcastInfo] = useState();
  const [podcastList, setPodcastList] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState();
  const [selectedEpisode, setSelectedEpisode] = useState();
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
      const selected = listAux.feed.entry.find(
        (podcast) => id === podcast["id"].attributes["im:id"]
      );
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
  };

  const getPodcastEpisodesByIdAndSelectOne = async (id, episodeId) => {
    try {
      const podcastDetail = await getDetailPodcast(id);
      const detail = podcastDetail.results[0];

      const episodeInfo = await fetchXMLWithCache(detail.feedUrl);
      setPodcastEpisodes(episodeInfo.items);
      setPodcastInfo(detail);

      const episodeToSelect = episodeInfo.items.find(
        (ep) => ep.guid === episodeId
      );
      selectAEpisode(episodeToSelect);
    } catch {
      setPodcastInfo();
    }
  };

  const getEpisodeInfo = async (url) => {
    try {
      const episodeInfo = await fetchXMLWithCache(url);
      setPodcastEpisodes(episodeInfo.items);
    } catch {
      setPodcastEpisodes();
    }
  };

  const selectAPodcast = (podcast) => {
    setSelectedPodcast(podcast);
  };

  const selectAEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  const clearPodcast = () => {
    selectAPodcast();
    selectAEpisode();
    setPodcastEpisodes([]);
  };

  return (
    <context.Provider
      value={{
        podcastInfo,
        podcastList,
        podcastEpisodes,
        selectedPodcast,
        selectedEpisode,
        clearPodcast,
        getAllPodcast,
        selectAPodcast,
        selectAEpisode,
        getEpisodeInfo,
        getAllAndSelectPodcast,
        getPodcastAndEpisodesById,
        getPodcastEpisodesByIdAndSelectOne,
      }}
    >
      {children}
    </context.Provider>
  );
}
