const playSong = (audio, setIsPlaying) => {
  if (audio.paused) {
    audio.play();
    setIsPlaying(true);
  } else {
    audio.pause();
    setIsPlaying(false);
  }
};

export default playSong