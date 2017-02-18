const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackDev = require('./build/webpack.dev');
const webpackPro = require('./build/webpack.pro');

let base = {
	entry: {
		index: './src/index.js',
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	output: {
		publicPath: '/assets/',
		path: resolve(__dirname, 'dist'),
		filename: '[name].js', // '[name].[chunkhash].js?'
		chunkFilename: '[id].js?[chunkhash]',
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.jsx'],
	},
	module: {
		noParse: /jquery|zepto|vue|vue-router|vuex/,
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
			options: require('./build/vue-loader')
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader'],
		}, {
			test: /\.html$/,
			use: 'html-loader'
		}, {
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
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new FriendLyErrorsPlugin()
	],
	devServer: {
		port: 3000,
		historyApiFallback: {
			index: '/assets/'
		}
	},
	devtool: '#cheap-module-eval-source-map',
};


if(process.env.NODE_ENV !== 'production') { // dev
	base.module.rules = base.module.rules.concat(webpackDev.rules);
} else { // production
	base.output.filename = webpackPro.output.filename;
	base.devtool = webpackPro.devtool;
	base.module.rules = base.module.rules.concat(webpackPro.rules);
	base.plugins = base.plugins.concat(webpackPro.plugins);
}
// console.log(base.module.rules)
module.exports = base;
