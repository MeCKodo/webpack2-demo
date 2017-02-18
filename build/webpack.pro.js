const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const dev = require('./webpack.dev');
const vueLoaderConfig = require('./vue-loader');
const isProduction = process.env.NODE_ENV === 'production';

let webpackConfig = merge(dev, {
	output : {
		// path: path.resolve(__dirname, '../dist'),
		filename : '[name].[chunkhash].js'
	},
	module : {
	
	},
	plugins: [
		new ExtractTextPlugin({
			filename:'style.css',
			allChunks:true
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		
	],
	devtool: '#source-map',
});

module.exports = webpackConfig;