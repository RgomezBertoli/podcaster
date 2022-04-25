export async function getListConfiguration() {
  const response = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
  return await response.json();
}

export async function getDetailPodcast(id) {
  const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  return await response.json();
}