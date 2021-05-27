import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
const axios_auth = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
export default axios_auth;
