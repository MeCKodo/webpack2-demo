const path = require('path');
const { resolve } = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const vueLoaderConfig = require('./vue-loader');
const webpack = require('webpack');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		index: './src/index.js',
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	output: {
		publicPath: './',
		path: resolve(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: '[id].js',
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [{
			test: /\.(js|vue|jsx)$/,
			loader: 'eslint-loader',
			enforce: "pre",
			include: ['./src'],
			options: {
				formatter: eslintFriendlyFormatter
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			// options: vueLoaderConfig.dev
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader'],
		}, {
			test: /\.html$/,
			use: 'html-loader'
		},{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}]
	}
};