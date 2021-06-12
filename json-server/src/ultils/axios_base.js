const axios = require('axios');
const { BASE_URL } = require('./config');

const axios_base = () =>
  axios.create({
    baseURL: BASE_URL,
  });

module.exports = { axios_base };
