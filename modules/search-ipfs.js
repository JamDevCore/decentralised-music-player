import axios from 'axios';
const IpfsSearchApi =require('ipfs-search-client');
import {checkCID} from './find-music';

export const searchIpfsForHash = async (hash, res) => {
  try {
    const api = new IpfsSearchApi.DefaultApi();
    const data = await api.metadatahashGet(hash);
    console.log(data);
    data.metadata.hash = hash;
    return data;
  } catch (err) {
    console.log(err);
    
  }
};

export const searchIpfsForQuery = async (query, res) => {
  try {
    const api = new IpfsSearchApi.DefaultApi();
    // {{String}} Search string query, based on Elasticsearch's [Query string query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-dsl-query-string-query) syntax.
    const data = await axios.get(`https://api.ipfs-search.com/v1/search?q=${query}%20last-seen%3A%5B%20now%5C%2Fd-30d%20TO%20*%5D%20metadata.Content-Type%3A(audio*)&type=file&page=0`);
    // Checks for correctly formatted CIDs before continuing
    const relevantData = data.data.hits.filter(hit => checkCID(hit.hash));
    const allMetadata = await Promise.all(await relevantData.map(async data => {
      const metadata =  await api.metadatahashGet(data.hash);
      metadata.metadata.hash = data.hash;
      return metadata;
    }));
    console.log('rahh', allMetadata)
    return allMetadata;
  } catch (err) {
    console.log(err);
    return err;
  }
};