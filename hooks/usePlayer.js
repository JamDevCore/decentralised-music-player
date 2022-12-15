import React, { useEffect, useState } from 'react';


const usePlayer = ({ playlist}) => {
  const audio = typeof window !== 'undefined' && document.querySelector('#music-player');
  const [currentSong, setCurrentSong] = useState();
  const [lastDirection, setLastDirectionChange] =useState('forward');
  const [index, setIndex] = useState();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if(audio) {
      audio.addEventListener('loadeddata', async (e) => {
        try {

          if (playState) {
            playSong(e.target);
          }
        } catch (er) {
          console.log('second', er);
        }
      });
      audio.addEventListener('error', async (e) => {
        console.log('err', playState);
        skipSong(lastDirection);
      });
      audio.addEventListener('abort', async (e) => {
        console.log('abort');
        if(playState) {
          skipSong(lastDirection);
        }
      });

      audio.addEventListener('ended', async (e) => {
        console.log('ended');
        if(playState) {
          skipSong(lastDirection);
        }
      });    }
  }, [audio]);

  const playSongError = () => {
    console.log('play song error');
  };
  
  
  const pauseSongError = () => {
    console.log('pause song error');
  };

  const skipSong = async (direction) => {
    setLastDirectionChange(direction)
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
  
  const pauseSong = async () => {
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