export const playSong = async (audio, setIsPlaying,  playlist, setIsLoading, setCurrentSongIndex, currentSongIndex) => {
  if (audio.paused) {
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      // const parentEle = audio.parentElement;
      // audio.remove();
      // const newEle = document.createElement('audio');
      // newEle.setAttribute('src', `https://gateway.ipfs.io/ipfs/${playlist[currentSongIndex + 1].hash}` || '');
      // newEle.setAttribute('id', 'music-player');
      // newEle.setAttribute('className', 'hidden');
      // parentEle.appendChild(newEle);
      // setIsPlaying(false);
      // setIsLoading(false);
      // if(playlist && playlist.length) {
      //   setCurrentSongIndex(currentSongIndex + 1);
      // }
    }
  } else {
    try {
      await audio.pause();
      setIsPlaying(false);
    } catch (err) {
      // console.log('err', err);
      // const parentEle = audio.parentElement;
      // audio.remove();
      // const newEle = document.createElement('audio');
      // newEle.setAttribute('src', `https://gateway.ipfs.io/ipfs/${playlist[currentSongIndex + 1].hash}` || '');
      // newEle.setAttribute('id', 'music-player');
      // newEle.setAttribute('className', 'hidden');
      // parentEle.appendChild(newEle);
      // setIsPlaying(false);
      // setIsLoading(false);
      // if(playlist && playlist.length) {
      //   setCurrentSongIndex(currentSongIndex + 1);
      // }
    }
  }
};

export const stepForward = async (audio, playlist, setCurrentSongIndex, currentSongIndex, setIsPlaying) => {
  try {
    if(playlist && playlist.length) {
      console.log(playlist.length, currentSongIndex + 1)
      if(currentSongIndex + 1 <= playlist.length -1) {
        setIsPlaying(false);
        audio.src = playlist[currentSongIndex + 1];
        await setCurrentSongIndex(currentSongIndex + 1);
   
      } else {
        setIsPlaying(false);
        audio.src = playlist[0];
        await setCurrentSongIndex(0);
      }
    }
  } catch (err) {
    console.log(err);
  }
};



export const stepBackward = async (audio, playlist, setCurrentSongIndex, currentSongIndex, setIsPlaying) => {
  try {
    if(playlist && playlist.length) {
      if(playlist.length -1 <= currentSongIndex + 1) {
        setIsPlaying(false);
        audio.src = playlist[currentSongIndex - 1];
        await setCurrentSongIndex(currentSongIndex -1);
    
      } else {
        setIsPlaying(false);
        audio.src = playlist[playlist.length -1];
        await setCurrentSongIndex(playlist.length -1);
      }
    }

   
  } catch (err) {
    console.log(err);
  }
};

