const webpackBrowserLog = require('webpack-browser-log');
const merge = require('webpack-merge');
const webpackDev = require('./webpack.dev');
const base = require('./webpack.base');
const webpackConfig = merge(base,webpackDev);

new webpackBrowserLog(webpackConfig);
