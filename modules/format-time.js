function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let timeForSeconds = time - minutes * 60; // seconds without counted minutes
  let seconds = Math.floor(timeForSeconds);
  let secondsReadable = seconds > 9 ? seconds : `0${seconds}`; // To change 2:2 into 2:02
  return `${minutes}:${secondsReadable}`;
}

export default formatTime;
