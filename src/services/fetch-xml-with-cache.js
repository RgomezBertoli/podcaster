import Parser from "rss-parser";

import { hasExpired } from "utils/has-expired";

export default async function fetchXMLWithCache(url) {
  const storedObject = localStorage.getItem(url);
  const cachedObject = storedObject && JSON.parse(storedObject);

  if (cachedObject && !hasExpired(cachedObject.date)) {
    return cachedObject.value;
  }
  let parser = new Parser();
  try {
    const content = await parser.parseURL(
      `https://api.allorigins.win/raw?url=${url}`
    );
    try {
      localStorage.setItem(
        url,
        JSON.stringify({ date: Date.now(), value: content })
      );
    } catch (e) {
      console.error("CACHE IS FULL, NEED TO EMPTY IT TO CONTINUING CACHING");
    }
    return content;
  } catch (e) {
    console.error("XML WRONG FORMAT");
  }
}
