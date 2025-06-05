import axios from 'axios';
import { urls } from '../../../config';

const axiosClient = axios.create({
  baseURL: urls.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed
// axiosClient.interceptors.request.use(...);

export default axiosClient;