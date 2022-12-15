import React, { useEffect, useState } from 'react';


const usePlayer = ({ playlist}) => {
  const audio = typeof window !== 'undefined' && document.querySelector('#music-player');
  const [currentSong, setCurrentSong] = useState();
  const [index, setIndex] = useState();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if(audio) {
      audio.addEventListener('loadeddata', async (e) => {
        console.log(e, playState);
        if (playState) {
          playSong(e.target);
        }
      });
      audio.addEventListener('error', async (e, err) => {
        if(playState) {
          skipSong('forward');
        }
      });
    }
  }, [audio]);

  const playSongError = () => {
    console.log('play song error');
  };
  
  
  const pauseSongError = () => {
    console.log('pause song error');
  };

  const skipSong = async (direction) => {
    if(direction === 'forward') {
      if(index + 1 <= playlist.length) {
        await setIndex(index + 1);
      } else {
        await setIndex(0);
      }
    } else {
      if(index -1 >= 0) {
        await setIndex(index - 1);
      } else {
        await setIndex(playlist.length -1);
      }
    }
  };
  const playSong = async () => {
    try {
      await audio.play();
      await setPlayState(true);
      console.log('yo');
    } catch (err) {
      // console.log('helooo', err, audio.playing, audio.error, audio.loaded);
      // if(!audio.playing) {
      // // If a song fails to load we skip it forward.
      // // May be better to add a warning instead
      // skipSong('forward');
      // }
    }
  };
  
  const pauseSong = async ({ audio }) => {
    try {
      await audio.pause();
      setPlayState(false);
    } catch (err) {
      pauseSongError();
    }
  };

  const playPauseSong = async () => {
    try {
      if (audio.paused) {
        await audio.play();
        setPlayState(true);
      } else {
        await audio.pause();
        setPlayState(false);
      }
    } catch (err) {
      console.log(err);
      // If a song fails to load we skip it forward.
      // May be better to add a warning instead
      skipSong('forward');
    }
  };
  
  const setSong = (i) => {
    setIndex(i);
  };
  
  useEffect(() => {
    setCurrentSong(playlist[index]);
    if(playState) {
      playSong(audio);
    }
  },[index, playlist]);
  return [
    {
      currentSong,
      index,
      playlist,
      playState,
      setPlayState,
      skipSong,
      playPauseSong,
      playSong,
      setSong,
      pauseSong
    },
  ];
};

export default usePlayer;