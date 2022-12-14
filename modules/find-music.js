import axios from 'axios';
import formatMetadata from './format-metadata';

const validateQuery = (q) => {
  if(typeof q === 'string') {
    return q.replace(/[^a-zA-Z0-9 ]/g, '');
  }
  return '';
};

export const findMusicBasedOnHash = async (query, setPlayingNow) => {
  const validatedQuery = validateQuery(query);
  if(validateQuery) {
    const result = await axios.get(`/api/find-music?query=${validatedQuery}&type=hash`);
    console.log(result)
    setPlayingNow(formatMetadata(result.data.data.metadata));
    return result.data;
  }
};



export const findMusicBasedOnSearchQuery= async (query) => {
  const validatedQuery = validateQuery(query);
  if(validateQuery) {
    const result = await axios.get(`/api/find-music?query=${validatedQuery}&type=search`);

    return result.data;
  }
};
  
  