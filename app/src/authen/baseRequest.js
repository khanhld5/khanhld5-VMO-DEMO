import axios from 'axios';
import { BASE_URL } from '../Constant/constant';
const axios_base = () =>
  axios.create({
    baseURL: BASE_URL,
  });
export default axios_base;
