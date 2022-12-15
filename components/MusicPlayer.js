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
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import usePlayer from '../hooks/usePlayer';

const MusicPlayer = ({ 
  currentSong,
  index,
  playState,
  setPlayState,
  skipSong,
  playPauseSong,
  playSong,
  setSong,
  pauseSong
}) => {
  const [isLoading, setIsLoading] = useState(false);

    
  const [error, setError] = useState('');
  useEffect(() => {
    console.log(currentSong, index);
  }, [currentSong, index]);
  return (
    <>
    <div key={index}>
      <audio
        muted={false}
        id="music-player"
        controls
        autoPlay={false}
        className="hidden"
        src={`https://gateway.ipfs.io/ipfs/${currentSong?.hash}`}
      />
      {currentSong && (
        <div className="mt-8" key={index}>
          <div className="bg-black rounded-md  flex flex-col">
            <div className="flex flex-col border-b-4 px-8 py-8">
              <p className="text-xs mb-1">Now Playing</p>
              <h3 className="text-md"> {currentSong.title}</h3>
              <h3 className="text-md text-gray-400"> by {currentSong.artist}</h3>
            </div>
            <div className="flex flex-col justify-center px-8 py-8">
              <div className="my-auto ml-4 flex align-center flex justify-center">
                <button
                  className="my-auto mx-4 bg-white h-12 w-12"
                  style={{ borderRadius: '50%' }}
                  onClick={async () => {
                    // setIsLoading(true);
                    await skipSong('backward');

                  }}
                >
                  {' '}
                  <FaFastBackward className="text-2xl text-black my-auto mx-auto" />
                </button>
                {!isLoading ? (
                  <>
                    <button
                      className="my-auto mx-4"
                      onClick={async () => {

                        setIsLoading(true);
                        await playPauseSong();
                        setIsLoading(false);
                      }}
                    >
                      {' '}
                      {playState ? (
                        <FaPauseCircle className="text-5xl my-auto" />
                      ) : (
                        <FaPlayCircle className="text-5xl my-auto" />
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="my-auto mx-4 bg-white h-12 w-12"
                      style={{ borderRadius: '50%' }}
                    >
                      {' '}
                      <FaSpinner className="text-2xl text-black my-auto mx-auto spinner" />
                    </button>
                  </>
                )}
                <button
                  className="my-auto mx-4 bg-white h-12 w-12"
                  style={{ borderRadius: '50%' }}
                  onClick={async () => {
                    setIsLoading(true);
                    await skipSong('forward');
                    setIsLoading(false);
                  }}
                >
                  {' '}
                  <FaFastForward className="text-2xl text-black my-auto mx-auto" />
                </button>
              </div>
            </div>
          </div>
          {error && (
            <div className="rounded px-8 py-4 bg-red-400 ">
              <p className="text-white text-sm">{error}</p>
              <button onClick={() => setError('')}>Close error</button>
            </div>)}
        </div>
      )}
      </div>
    </>
    
  );
};


export default MusicPlayer;