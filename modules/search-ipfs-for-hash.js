import axios from 'axios';
const IpfsSearchApi =require('ipfs-search-client');

const searchIpfsForHash = async (hash, res) => {
  try {
    const api = new IpfsSearchApi.DefaultApi();
    const data = await api.metadatahashGet(hash);
    return data;
  } catch (err) {
    console.log(err);
    
  }
};

export default searchIpfsForHash;