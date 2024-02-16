import axios from 'axios';

const post = async (url, { arg }) => {
  try {
    const receiveData = await axios.post(url, arg);
    return receiveData;
  } catch (error) {
    return error;
  }
};

export { post };
