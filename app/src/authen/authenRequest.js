import axios from 'axios';
const baseURL = 'http://localhost:8080';
const axios_auth = (token) =>
  axios.create({ baseURL, headers: { Authorization: `Bearer ${token}` } });
export default axios_auth;
