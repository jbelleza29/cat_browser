import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': '4e83aea9-90fd-43e6-b421-a61c2afb58d2'
  }
});

export default axiosInstance;