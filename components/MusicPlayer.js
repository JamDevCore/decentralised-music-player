// import {
//   playPauseSong,
//   stepBackward,
//   stepForward,
//   monitorEvents,
// } from '../modules/music-player-lib';
import {
  FaPlayCircle,
  FaPauseCircle,
  FaFastForward,
  FaFastBackward,
  FaSpinner,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import usePlayer from "../hooks/usePlayer";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import formatTime from "../modules/format-time";

const MusicPlayer = ({
  currentSong,
  index,
  playState,
  skipSong,
  playPauseSong,
  duration,
  playlist,
  setTime,
  timeLapsed,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(duration);
  return (
    <>
      <div key={index}>
        <audio
          key={playlist[index]?.hash}
          muted={false}
          id="music-player"
          controls
          autoPlay={false}
          loop={false}
          className="hidden"
          src={`https://gateway.ipfs.io/ipfs/${playlist[index]?.hash}`}
        />
        {currentSong && (
          <div className="mt-8" key={index}>
            <div className="bg-black rounded-md  flex flex-col">
              <div className="flex flex-col  px-8 py-8">
                <div className="flex justify-between">
                  <p className="text-xs mb-1">Now Playing</p>
                  <Tooltip
                    placement="top"
                    trigger={["hover"]}
                    overlay={currentSong.hash}
                    overlayClassName="w-96 text-center font-bold p-4"
                  >
                    <p className="text-xs text-gray-400">
                      {" "}
                      IPFS CID:{" "}
                      {currentSong.hash.slice(0, 3) +
                        ".." +
                        currentSong.hash.slice(-3)}
                    </p>
                  </Tooltip>
                </div>
                <h3 className="text-md"> {currentSong.title}</h3>
                <h3 className="text-md text-gray-400">
                  {" "}
                  by {currentSong.artist}
                </h3>
              </div>
              <div className="px-8" key={duration + timeLapsed}>
                <p className="mb-2 text-center" key={duration}>{`${formatTime(
                  timeLapsed
                )} / ${formatTime(duration)}`}</p>
                <Slider
                  min={0}
                  max={duration}
                  value={timeLapsed}
                  trackStyle={{ backgroundColor: "#57FF00", height: 10 }}
                  handleStyle={{
                    borderColor: "gray",
                    height: 14,
                    width: 14,
                    marginLeft: 0,
                    marginTop: -2,
                    backgroundColor: "black",
                  }}
                  railStyle={{ backgroundColor: "white", height: 10 }}
                  onChange={(e) => {
                    if (e >= duration) {
                      setTime(duration - 1);
                    } else {
                      setTime(e);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col justify-center px-8 py-8">
                <div className="my-auto ml-4 flex align-center flex justify-center">
                  <button
                    className="my-auto mx-2 md:mx-4 bg-white w-8 h-8 sm:h-12 sm:w-12"
                    style={{ borderRadius: "50%" }}
                    onClick={async () => {
                      // setIsLoading(true);
                      await skipSong("backward");
                    }}
                  >
                    {" "}
                    <FaFastBackward className="text-lg sm:text-2xl text-black my-auto mx-auto" />
                  </button>
                  {!isLoading ? (
                    <>
                      <button
                        className="my-auto mx-2 md:mx-4"
                        onClick={async () => {
                          setIsLoading(true);
                          await playPauseSong();
                          setIsLoading(false);
                        }}
                      >
                        {" "}
                        {playState ? (
                          <FaPauseCircle className="text-4xl sm:text-5xl my-auto" />
                        ) : (
                          <FaPlayCircle className="text-4xl sm:text-5xl my-auto" />
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="my-auto mx-4 bg-white w-8 h-8 sm:h-12 sm:w-12"
                        style={{ borderRadius: "50%" }}
                      >
                        {" "}
                        <FaSpinner className="text-md sm:text-2xl  text-black my-auto mx-auto spinner" />
                      </button>
                    </>
                  )}
                  <button
                    className="my-auto mx-2 md:mx-4 bg-white  w-8 h-8 sm:h-12 sm:w-12"
                    style={{ borderRadius: "50%" }}
                    onClick={async () => {
                      setIsLoading(true);
                      await skipSong("forward");
                      setIsLoading(false);
                    }}
                  >
                    {" "}
                    <FaFastForward className="text-lg sm:text-2xl text-black my-auto mx-auto" />
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <div className="rounded px-8 py-4 bg-red-400 ">
                <p className="text-white text-sm">{error}</p>
                <button onClick={() => setError("")}>Close error</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
