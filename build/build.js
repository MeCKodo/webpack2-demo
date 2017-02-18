var webpack = require('webpack');
var ora = require('ora');
var path = require('path');
var chalk = require('chalk');
var webpackConfig = require('./webpack.pro')
var spinner = ora('building for production...');
spinner.start();

webpack(webpackConfig, function (err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')
	
	console.log(chalk.cyan('  Build complete.\n'));
	console.log(chalk.yellow(
		'  Tip: built files are meant to be served over an HTTP server.\n' +
		'  Opening index.html over file:// won\'t work.\n'
	))
});
