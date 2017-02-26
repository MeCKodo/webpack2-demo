const webpackBrowserLog = require('webpack-browser-log');
const merge = require('webpack-merge');
const webpackDev = require('./webpack.dev');
const base = require('./webpack.base');
const webpackConfig = merge(base,webpackDev);

const uri = 'http://localhost:' + 3000;

new webpackBrowserLog(webpackConfig);
