const webpackBrowserLog = require('webpack-browser-log');
const merge = require('webpack-merge');
const webpackDev = require('./webpack.dev');
const base = require('./webpack.base');
const webpackConfig = merge(base,webpackDev);

const uri = 'http://localhost:' + 3000;

new webpackBrowserLog(webpackConfig,{
	// port : 3000,
	devMiddleware : {
		publicPath: webpackConfig.output.publicPath,
		quiet: true
	},
	hotMiddleware : {
		log: () => {}
	},
	waitUntilValid : function () {
		console.log('> Listening at ' + uri + '\n')
	}
});
