const DAY_IN_MILIS = 24 * 60 * 60 * 1000;

export function hasExpired(date){
  const now = Date.now();
  const diff = now - date

  return diff > DAY_IN_MILIS;
}
