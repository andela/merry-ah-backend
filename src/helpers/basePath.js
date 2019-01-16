const basePath = (req) => {
  const path = `${req.protocol}://${req.headers.host}`;
  return path;
};

export default basePath;
