export default function milisToDuration(milis) {
  let result = "";
  
  const seconds = Math.floor((milis / 1000) % 60);
  const minutes = Math.floor((milis / (1000 * 60)) % 60);
  const hours = Math.floor((milis / (1000 * 60 * 60)) % 24);

  if(hours){
    result += hours < 10 ? `0${hours}:` : `${hours}:`;
  }

  const formatedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formatedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${result}${formatedMinutes}:${formatedSeconds}`;
}
