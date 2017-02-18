const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
const webpackDev = require('./build/webpack.dev');
const webpackPro = require('./build/webpack.pro');
const merge = require('webpack-merge');

const vueLoaderConfig = require('./build/vue-loader')(isProduction);

let base = {
	entry: {
		index: './src/index.js',
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	output: {
		// publicPath: '/static/',
		path: resolve(__dirname, 'dist'),
		filename: '[name].js', // '[name].[chunkhash].js?'
		chunkFilename: '[id].js?[chunkhash]',
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.jsx'],
	},
	module: {
		// noParse: /jquery|zepto|vue|vue-router|vuex/,
		rules: [{
			test: /\.(js|vue|jsx)$/,
			loader: 'eslint-loader',
			enforce: "pre",
			// include: ['./src'],
			// options: {
			// 	formatter: eslintFriendlyFormatter
			// }
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
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
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// any required modules inside node_modules are extracted to vendor
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, '../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new FriendLyErrorsPlugin({
			compilationSuccessInfo: {
				messages: ['You application is running here http://localhost:3000'],
				notes: ['Some additionnal notes to be displayed unpon successful compilation']
			}
		})
	],
	devServer: {
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: {
			index: '/static/'
		}
	},
	devtool: '#cheap-module-eval-source-map',
};


if(process.env.NODE_ENV !== 'production') { // dev
	// base.module.rules = base.module.rules.concat(webpackDev.rules);
	// base.plugins = base.plugins.concat(webpackDev.plugins);
	base = merge(base,webpackDev);
	
} else { // production
	base = merge(base,webpackPro);
	// base.output = webpackPro.output;
	// base.devtool = webpackPro.devtool;
	// base.module.rules = base.module.rules.concat(webpackPro.rules);
	// base.plugins = base.plugins.concat(webpackPro.plugins);
}
// console.log(base.module.rules)
module.exports = base;
