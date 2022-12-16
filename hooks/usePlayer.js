import React, { useEffect, useState, useRef, use } from 'react';

const usePlayer = ({ playlist }) => {
  const audio =
    typeof window !== 'undefined' && document.querySelector('#music-player');
  const [currentSong, setCurrentSong] = useState();
  const [lastDirection, setLastDirectionChange] = useState('forward');
  const [index, setIndex] = useState();
  const [duration, setDuration] = useState(0);
  const [timeLapsed, setTimeLapsed] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [newError, setError] = useState('');

  function durationChange() {
    console.log('duration', audio.duration);
    setDuration(audio.duration || 0);
    setTimeLapsed(0);
  }
  function timeUpdate() {

    setTimeLapsed(audio.currentTime);
    console.log('timeupdate', audio.duration);
  }
  function playing () {
    setDuration(audio.duration || 0);
    console.log('playing', audio.duration);
  }

  function loadedData() {
    if (playState) {
      setDuration(audio.duration);
      if(audio.canPlayType(audio.format)) {
        setError('This file format cannot be played on your browser');
      } else {
        playSong();
      }
    }
  }

  // function canPlay () {
  //     if (playState) {
  //        playSong();
  //     }
  // }

  function error() {
    console.log('error');
    console.log(audio.error);
    console.log('error', audio.duration);
    setDuration(audio.duration || 0);
    // setTimeLapsed(0);
    // skipSong(lastDirection);
  }
  function abort() {
    console.log('abort', audio.duration);
    setDuration(audio.duration || 0);
    // setTimeLapsed(0);
    // audio.src = "";
  }
  function ended() {
    setDuration(audio.duration || 0);
    // setTimeLapsed(0);
    skipSong('forward');
  }

  function progress(e) {
    // console.log(e);
  }
  useEffect(() => {
    if (audio) {
      audio.addEventListener('canplay', loadedData);
      audio.addEventListener('playing', playing);
      audio.addEventListener('durationchange', durationChange);
      audio.addEventListener('timeupdate', timeUpdate);
      audio.addEventListener('loadeddata', loadedData);

      audio.addEventListener('error', error);
      audio.addEventListener('abort', abort);
      audio.addEventListener('ended', ended);
      audio.addEventListener('progress', progress);
      () => {
        audio.removeEventListener('loadeddata', loadedData);
        audio.removeEventListener('durationchange', durationChange);
        audio.removeEventListener('timeupdate', timeUpdate);
        // audio.removeEventListener('loadeddata', loadedData);
        audio.removeEventListener('playing', playing);
        audio.removeEventListener('canplay', loadedData);
        audio.removeEventListener('error', error);
        audio.removeEventListener('abort', abort);
        audio.removeEventListener('ended', ended);
        audio.removeEventListener('progress', progress);
      };
    }
  }, [audio]);

  const playSongError = () => {
    console.log('play song error');
  };

  const pauseSongError = () => {
    console.log('pause song error');
  };

  const skipSong = async (direction) => {
    setLastDirectionChange(direction);
    setError('');
    deleteAudio();
    if (direction === 'forward') {
      if (index + 1 < playlist.length) {
        await setIndex(index + 1);
      } else {
        await setIndex(0);
      }
    } else {
      if (index - 1 >= 0) {
        await setIndex(index - 1);
      } else {
        await setIndex(playlist.length - 1);
      }
    }
  };
  const playSong = async () => {
    try {
      if(audio.canPlayType(audio.format)) {
        setError('This file format cannot be played on your browser');
      } else {
        await audio.play();
        await setPlayState(true);
      }

    } catch (err) {
      console.log(err);
      skipSong(lastDirection);
    }
  };

  const pauseSong = async () => {
    try {
      console.log('here pause');
      await audio.pause();
      setPlayState(false);
    } catch (err) {
      pauseSongError();
    }
  };

  const setTime = (time) => {
    if (time >= duration) {
      audio.currentTime = duration;
    } else {
      audio.currentTime = time;
    }
  };

  const deleteAudio  = () => {
    audio.src = ''; // Stops audio download.
    audio.load();
  };

  const playPauseSong = async () => {
    try {
      console.log('nw state', audio.networkState);
      if (audio.readyState !== 0) {
        if (!playState || audio.paused) {
          console.log(audio.readyState);

          if(audio.canPlayType(audio.format)) {
            setError('This file format cannot be played on your browser');
          } else {
            await audio.play();
            await setPlayState(true);
          }
        } else {
          await audio.pause();
          setPlayState(false);
        }
      } else {
        setError(
          'The song is having trouble loading. It may have recently been deleted from IPFS. You can skip to the next one at any time'
        );
        // console.log("yo");
        // setPlayState(!playState);
        // skipSong('forward')
        // audio.src = '';
      }
    } catch (err) {
      console.log(err);
      // If a song fails to load we skip it forward.
      // May be better to add a warning instead
      // skipSong("forward");
    }
  };

  const setSong = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    setCurrentSong(playlist[index]);
  }, [index, playlist]);

  const eventListener = (event) => {
    if (event.keyCode === '32') {
      playPauseSong();
    }
  };
  // Add event listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', eventListener);
    }
    () => {
      document.removeEventListener('keydown', eventListener);
    };
  }, []);

  return [
    {
      currentSong,
      index,
      playlist,
      playState,
      setPlayState,
      duration,
      deleteAudio,
      timeLapsed,
      skipSong,
      playPauseSong,
      playSong,
      setSong,
      setError,
      error: newError,
      pauseSong,
      setTime,
    },
  ];
};

export default usePlayer;
