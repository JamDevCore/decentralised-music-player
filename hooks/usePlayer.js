import React, { useEffect, useState, useRef, use } from "react";

const usePlayer = ({ playlist }) => {
  const audio =
    typeof window !== "undefined" && document.querySelector("#music-player");
  const [currentSong, setCurrentSong] = useState();
  const [lastDirection, setLastDirectionChange] = useState("forward");
  const [index, setIndex] = useState();
  const [duration, setDuration] = useState(0);
  const [timeLapsed, setTimeLapsed] = useState(0);
  const [playState, setPlayState] = useState(false);
  const [newError, setError] = useState("");

  const durationChange = () => {
    setDuration(isNaN(audio.duration) ? 0 : audio.duration);
    setTimeLapsed(0);
  };
  const timeUpdate = () => {
    setTimeLapsed(audio.currentTime);
    // console.log('timeupdate', audio.duration);
  };
  const playing = () => {
    setDuration(isNaN(audio.duration) ? 0 : audio.duration);
  };

  const loadedData = () => {
    setDuration(isNaN(audio.duration) ? 0 : audio.duration);
  };

  // const canPlay () {
  //     if (playState) {
  //        playSong();
  //     }
  // }
  const suspended = () => {
    console.log("suspended", audio.error, audio.readyState, audio.networkState);
  };

  const error = () => {
    setDuration(isNaN(audio.duration) ? 0 : audio.duration);
    if (currentSong && audio?.error && audio?.error?.message === "") {
      setError("This file format cannot be played on your browser");
    }
  };
  const abort = () => {};
  const ended = () => {
    // setTimeLapsed(0);
    skipSong("forward");
  };

  const progress = () => {
    // console.log(e);
  };
  useEffect(() => {
    if (audio) {
      audio.addEventListener("suspend", suspended);
      audio.addEventListener("playing", playing);
      audio.addEventListener("durationchange", durationChange);
      audio.addEventListener("timeupdate", timeUpdate);
      audio.addEventListener("loadeddata", loadedData);

      audio.addEventListener("error", error);
      audio.addEventListener("abort", abort);
      audio.addEventListener("ended", ended);
      audio.addEventListener("progress", progress);
      () => {
        audio.removeEventListener("suspend", suspended);

        audio.removeEventListener("durationchange", durationChange);
        audio.removeEventListener("timeupdate", timeUpdate);
        audio.removeEventListener("loadeddata", loadedData);
        audio.removeEventListener("playing", playing);

        audio.removeEventListener("error", error);
        audio.removeEventListener("abort", abort);
        audio.removeEventListener("ended", ended);
        audio.removeEventListener("progress", progress);
      };
    }
  }, [audio]);

  const pauseSongError = () => {
    console.log("pause song error");
  };

  const skipSong = async (direction) => {
    setLastDirectionChange(direction);
    setError("");
    deleteAudio();
    if (direction === "forward") {
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
      await audio.play();
      await setPlayState(true);
    } catch (err) {
      console.log(err);
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

  const setTime = (time) => {
    if (time >= duration) {
      audio.currentTime = duration;
    } else {
      audio.currentTime = time;
    }
  };

  const deleteAudio = () => {
    audio.src = ""; // Stops audio download.
    setTimeLapsed(0)
    audio.load();

  };

  const playPauseSong = async () => {
    try {
      if (audio.readyState !== 0) {
        if (!playState || audio.paused) {
          await audio.play();
          await setPlayState(true);
        } else {
          await audio.pause();
          setPlayState(false);
        }
      } else {
        setError(
          "The song is having trouble loading. It may have recently been deleted from IPFS. You can skip to the next one at any time"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setSong = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    if (playState) {
      setDuration(isNaN(audio.duration) ? 0 : audio.duration);
      playSong();
    }
  }, [currentSong]);

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
