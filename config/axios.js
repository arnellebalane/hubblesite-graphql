const axios = require('axios');
const config = require('./index');

const instance = axios.create({
    baseURL: config.api.endpoint
});

module.exports = instance;
