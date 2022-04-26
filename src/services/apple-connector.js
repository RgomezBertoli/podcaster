import { getWithCache } from "services/fetch-with-cache";

export function getListConfiguration() {
  return getWithCache(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
}

export function getDetailPodcast(id) {
  return getWithCache(`https://itunes.apple.com/lookup?id=${id}`);
}