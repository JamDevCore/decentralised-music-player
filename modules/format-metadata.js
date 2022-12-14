const formatMetadata = (metatadata) => {
  console.log(metatadata, metatadata.hash, 'hello');
  const data = {
    title: metatadata?.title?.[0] || 'Unknown',
    artist:  metatadata?.Author?.[0] || 'Anon',
    hash: metatadata.hash,
    length: metatadata?.['xmpDM:duration']?.[0] || '0',
    format: metatadata?.['Content-Type']?.[0] || 'audio/mpeg',
  };
  return data;
};

export default formatMetadata;