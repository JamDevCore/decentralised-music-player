const formatMetadata = (metatadata) => {
    console.log(metatadata)
  const data = {
    title: metatadata?.title[0] || 'Unknown',
    artist:  metatadata?.Author[0] || 'Anon',
    hash: metatadata?.resourceName[0],
    length: metatadata?.['xmpDM:duration'][0] || '0',
    format: metatadata?.['Content-Type'][0] || 'audio/mpeg',
  };
  return data;
};

export default formatMetadata;