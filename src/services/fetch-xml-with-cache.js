import Parser from "rss-parser";

import { hasExpired } from "utils/has-expired";

export default async function fetchXMLWithCache(url) {
  const storedObject = localStorage.getItem(url);
  const cachedObject = storedObject && JSON.parse(storedObject);

  if (cachedObject && !hasExpired(cachedObject.date)) {
    return cachedObject.value;
  }
  let parser = new Parser();
  const content = await parser.parseURL(
    `https://api.allorigins.win/raw?url=${url}`
  );

  localStorage.setItem(
    url,
    JSON.stringify({ date: Date.now(), value: content })
  );

  return content;
}
