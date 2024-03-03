import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = cookies.get('token');

      if (token) {
        config.headers.token = `${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
