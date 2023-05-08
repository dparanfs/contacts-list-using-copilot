import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3500',
});

export default apiClient;
