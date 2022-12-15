import React, { useEffect, useState, useRef } from "react";

const usePlayer = ({ playlist }) => {
  const audio =
    typeof window !== "undefined" && document.querySelector("#music-player");
  const [currentSong, setCurrentSong] = useState();
  const [lastDirection, setLastDirectionChange] = useState("forward");
  const [index, setIndex] = useState();
  const [duration, setDuration] = useState(0);
  const [timeLapsed, setTimeLapsed] = useState(0);
  const [playState, setPlayState] = useState(false);
  function durationChange() {
    setDuration(audio.duration || 0);
    setTimeLapsed(0);
  }
  function timeUpdate() {
    setTimeLapsed(audio.currentTime);
  }
  function loadedData() {
    if (playState && !audio.ended) {
      playSong();
    }
  }
  function error() {
    console.log("error");
    setDuration(audio.duration || 0);
    setTimeLapsed(0);
    skipSong(lastDirection);
  }
  function abort() {
    console.log("abort");
    setDuration(audio.duration || 0);
    setTimeLapsed(0);
  }
  function ended() {
    setDuration(audio.duration || 0);
    setTimeLapsed(0);
    skipSong("forward");
  }
  useEffect(() => {
    if (audio) {
      audio.removeEventListener("durationchange", durationChange);
      audio.removeEventListener("timeupdate", timeUpdate);
      audio.removeEventListener("loadeddata", loadedData);
      audio.removeEventListener("error", error);
      audio.removeEventListener("abort", abort);
      audio.removeEventListener("ended", ended);
      audio.addEventListener("durationchange", durationChange);
      audio.addEventListener("timeupdate", timeUpdate);
      audio.addEventListener("loadeddata", loadedData);
      audio.addEventListener("error", error);
      audio.addEventListener("abort", abort);
      audio.addEventListener("ended", ended);
    }
  }, [audio]);

  const playSongError = () => {
    console.log("play song error");
  };

  const pauseSongError = () => {
    console.log("pause song error");
  };

  const skipSong = async (direction) => {
    setLastDirectionChange(direction);

    if (direction === "forward") {
      if (index + 1 <= playlist.length) {
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
      await audio.play();
      await setPlayState(true);
    } catch (err) {
      console.log(err);
      skipSong(lastDirection);
    }
  };

  const pauseSong = async () => {
    try {
      console.log("here pause");
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
      skipSong("forward");
    }
  };

  const setSong = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    setCurrentSong(playlist[index]);
  }, [index, playlist]);

  const eventListener = (event) => {
    if (event.keyCode === "32") {
      playPauseSong();
    }
  };
  // Add event listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", eventListener);
    }
    () => {
      document.removeEventListener("keydown", eventListener);
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
      timeLapsed,
      skipSong,
      playPauseSong,
      playSong,
      setSong,
      pauseSong,
      setTime,
    },
  ];
};

export default usePlayer;
