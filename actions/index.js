import axios from 'axios';
import Cookies from 'js-cookie';

const setAuthHeader = () => {
  const token = Cookies.getJSON('jwt');

  return token
    ? {
        headers: { authorization: `Bearer ${token}` }
      }
    : undefined;
};

export const getSecretData = async () => {
  return await axios
    .get('/api/v1/secret', setAuthHeader())
    .then(response => response.data);
};
