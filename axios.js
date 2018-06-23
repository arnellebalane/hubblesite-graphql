const axios = require('axios');
const config = require('./config');

const instance = axios.create({
    baseURL: config.api.endpoint
});

module.exports = instance;
