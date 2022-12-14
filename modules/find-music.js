import axios from 'axios';
import formatMetadata from './format-metadata';

const validateQuery = (q) => {
  if(typeof q === 'string') {
    return q.replace(/[^a-zA-Z0-9 ]/g, '');
  }
  return '';
};


export const checkCID = (query) => {
  const regexp = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/g;
  const isCID = query.search(regexp);
  return isCID !== -1;
};

export const findMusicBasedOnHash = async (query, setPlayingNow) => {
  const validatedQuery = validateQuery(query);
  if(validateQuery) {
    const result = await axios.get(`/api/find-music?query=${validatedQuery}&type=hash`);
    return result;
  }
};

export const findMusicBasedOnSearchQuery= async (query) => {
  const validatedQuery = validateQuery(query);
  if(validateQuery) {
    const result = await axios.get(`/api/find-music?query=${validatedQuery}&type=search`);
    return result.data;
  }
};
  
export const findMusic = async (query, setPlayingNow, setPlaylist, setCurrentSongIndex) => {
  const isCID = checkCID(query);
  if(isCID) {
    const music = await findMusicBasedOnHash(query, setPlayingNow);
    // Check for playlist;
    setPlayingNow(formatMetadata(music.data.data.metadata));
    
  } else {
    const music = await findMusicBasedOnSearchQuery(query);
    const formattedMusic = music.data.map((d) => formatMetadata(d.metadata));
    console.log('hello', formattedMusic)
    setPlaylist(formattedMusic);
    setPlayingNow(formattedMusic[0]);
    setCurrentSongIndex(0);

  }

};
