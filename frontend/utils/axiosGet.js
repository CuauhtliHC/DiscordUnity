import axios from 'axios';

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);

export { fetcher };
