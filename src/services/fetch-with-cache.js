import { hasExpired } from "utils/has-expired";

export async function getWithCache(url){
  const storedObject = localStorage.getItem(url);
  const cachedObject = storedObject && JSON.parse(storedObject);

  if(cachedObject && !hasExpired(cachedObject.date)){
    return cachedObject.value;
  }

  const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
  const json = await response.json();
  const content = JSON.parse(json.contents);

  localStorage.setItem(url, JSON.stringify({date: Date.now(), value: content}));

  return content;
}