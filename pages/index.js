import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlayCircle,FaPauseCircle } from 'react-icons/fa';
import { findMusic } from '../modules/find-music';
import playSong from '../modules/play-song';

export default function Home() {
  const [playlist, setPlaylist] = useState();
  const [nowPlaying, setPlayingNow] = useState();
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    console.log(nowPlaying);
  }, [nowPlaying]);
  return (
    <div className="bg-gray-900">
      <main className="p-4 mx-auto w-full sm:w-1/2">
        <div className="mb-8 p-1">
          <h1 className="text-white text-2xl">Decent Music</h1>
          <p>
            A decentralised music player, that plays music from IPFS. Listen to
            songs you know, find new ones or your upload music, create playlist
            and listen.
          </p>
        </div>
        <div  className="">
          <div >
            <div>
              {/* <label
              htmlFor="name"
              className="ml-px block pl-4 text-sm font-medium text-gray-700"
            >
              Name
            </label> */}
              <div className="mt-1 flex p-1 ">
                <input
                  type="text"
                  name=""
                  id="hash"
                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Load an IFPS hash"
                />
                <button className="mx-2 bg-orange-400 rounded-full px-4 py-2" onClick={() => findMusic(document.querySelector('#hash').value, setPlayingNow, setIsPlaying)}>Search</button>
                <button className=" border-2 border-orange-400 text-orange-400 rounded-full px-4 py-2 bg-white">Play</button>
              </div>
            </div>
          </div>
          {nowPlaying && <div className="mt-8">
   
   
            <video muted={false} id="music-player"  controls className="hidden">
              <source src={`https://gateway.ipfs.io/ipfs/${nowPlaying.hash}`} type={nowPlaying.format} />
            </video>
            <div className="bg-black rounded-full px-8 py-4 flex flex-row">
              <div className="flex flex-col">
                <p className="text-xs mb-1">Now Playing</p>
                <h3 className="text-md"> {nowPlaying.title}</h3>
                <h3 className="text-md text-gray-400"> by {nowPlaying.artist}</h3>
              </div>
              <div className="my-auto ml-4">
                <button className="my-auto" onClick={async () => {
                  const audio = document.querySelector('#music-player');
                  await playSong(audio, setIsPlaying);

                }}> {isPlaying ? <FaPauseCircle className="text-3xl my-auto"/> : <FaPlayCircle className="text-3xl my-auto"/>}</button>
              </div>
            </div>
          </div>}
        </div>
      </main>
    </div>
  );
}
