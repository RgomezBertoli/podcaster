const DAY_IN_MILIS = 24 * 60 * 60 * 1000;

function hasExpired(date){
  const now = Date.now();
  const diff = now - date

  return diff > DAY_IN_MILIS;
}

export async function getWithCache(url){
  const storedObject = localStorage.getItem(url);
  const cachedObject = storedObject && JSON.parse(storedObject);

  if(cachedObject && !hasExpired(cachedObject.date)){
    return cachedObject.value;
  }

  const response = await fetch(url);
  const json = await response.json();

  localStorage.setItem(url, JSON.stringify({date: Date.now(), value: json}));

  return json;
}