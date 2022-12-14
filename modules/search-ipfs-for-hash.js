import axios from 'axios';
const IpfsSearchApi =require('ipfs-search-client');

export const searchIpfsForHash = async (hash, res) => {
  try {
    const api = new IpfsSearchApi.DefaultApi();
    const data = await api.metadatahashGet(hash);
    return data;
  } catch (err) {
    console.log(err);
    
  }
};

export const searchIpfsForQuery = async (query, res) => {
  const api = new IpfsSearchApi.DefaultApi();
  // {{String}} Search string query, based on Elasticsearch's [Query string query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-dsl-query-string-query) syntax.
  const opts = {
    type: 'audio/mpeg', // {{Type}} Resource type. Omit to return all types.
    page: 0, // {{Integer}} Page number.
  };
  const data = await api.searchGet(query, opts);
  console.log(data)
  return data;
};