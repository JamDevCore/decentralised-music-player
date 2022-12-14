import { searchIpfsForHash, searchIpfsForQuery  } from '../../modules/search-ipfs-for-hash';

export default async function handler(req, res) {
  try {
    if(req.method === 'GET') {
      if(req.query.type === 'hash') {
        const searchResults = await searchIpfsForHash(req.query.query, res);
        res.status(200).json({message: 'success', data: searchResults });
      } else {
        const searchResults = await searchIpfsForQuery(req.query.query, res);
        res.status(200).json({message: 'success', data: searchResults });
      }
    } else {
      res.status(404).json({ message: 'Method not in use' });
    }
  } catch (err) {
    console.log(err);
  }
}
