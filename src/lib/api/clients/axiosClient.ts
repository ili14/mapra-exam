import axios from 'axios';
import { urls } from '../../../config';

const axiosClient = axios.create({
  baseURL: urls.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosClient;