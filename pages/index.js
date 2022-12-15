import Head from 'next/head';
import NextScript from 'next/script';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaPlayCircle,
} from 'react-icons/fa';
import { findMusic } from '../modules/find-music';
import MusicPlayer from '../components/MusicPlayer';
import usePlayer from '../hooks/usePlayer';


export default function Home() {
  const [playlist, setPlaylist] = useState([]);
  const [{
    currentSong,
    index,
    playState,
    setPlayState,
    skipSong,
    playPauseSong,
    playSong,
    setSong,
    pauseSong
  }]  = usePlayer({ playlist });

  return (
    <div className="bg-gray-900">
      <main className="p-4 mx-auto w-full sm:w-4/5">
        <div className="mb-8 p-1">
          <h1 className="text-white text-2xl">Decent Music</h1>
          <p>
            A decentralised music player, that plays music from IPFS. Listen to
            songs you know, find new ones or your upload music, create playlist
            and listen.
          </p>
        </div>
        <div className="">
          <div>
            <div>
              <div className="mt-1 flex p-1 ">
                <input
                  type="text"
                  name=""
                  id="hash"
                  className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search for music e.g 'metal', or paste in an existing IPFS CID"
                />
                <button
                  className="mx-2 bg-orange-400 rounded-full px-4 py-2"
                  onClick={() =>
                    findMusic({
                      query: document.querySelector('#hash').value,
                      setPlaylist,
                      setSong,
                    })
                  }
                >
                  Search
                </button>
                <button className=" border-2 border-orange-400 text-orange-400 rounded-full px-4 py-2 bg-white">
                  Play
                </button>
              </div>
            </div>
          </div>
          <MusicPlayer
            currentSong={currentSong}
            index={index}
            playlist={playlist}
            playState={playState}
            setPlayState={setPlayState}
            skipSong={skipSong}
            playPauseSong={playPauseSong}
            playSong={playSong}
            setSong={setSong}
            pauseSong={pauseSong}
          />
          <div className="w-full">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
            </div>
            <div className=" mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6"
                    >
                      Song
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell"
                    >
                      Artist
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 sm:table-cell"
                    >
                      CID
                    </th>
                    <th
                      scope="col"
                      className="sm:hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
                    ></th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 bg-black">
                  {playlist &&
                    playlist.length > 0 &&
                    playlist.map((song, index) => {
                      return (
                        <tr key={song.hash}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                            {song.title}
                            <dl className="font-normal lg:hidden">
                              {/* <dt className="sr-only">Title</dt> */}

                              <dd className="mt-1 truncate text-gray-300">
                                {song.artist}
                              </dd>
                              {/* <dt className="sr-only sm:hidden">Length</dt> */}
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-600 lg:table-cell">
                            {song.artist}
                          </td>
                          {/* <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{song.artist}</td> */}
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {song.hash.slice(0, 3) + '..' + song.hash.slice(-3)}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => {
                                setSong(index);
                              }}
                              className="text-orange-600 hover:text-indigo-900"
                            >
                              <FaPlayCircle className="text-2xl" />
                              <span className="sr-only"></span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
