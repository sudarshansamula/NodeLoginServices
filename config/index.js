const path = require('path')
const ENV = process.env.NODE_ENV || 'dev';
const envConfig = require(path.join(__dirname, 'env', ENV));// eslint-disable-line import/no-dynamic-require

const config = Object.assign(
    {
        [ENV]: true,
        env: ENV
    },
    envConfig
);
module.exports = config;
