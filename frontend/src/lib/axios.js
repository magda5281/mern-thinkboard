import axios from 'axios';
const DEV_URL = import.meta.env.VITE_API_DEV_URL;
const BASE_URL = import.meta.env.MODE === 'development' ? DEV_URL : 'api/';
const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
