const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');


module.exports = {
	entry: {
		index: ['webpack-hot-middleware/client?reload=true','./src/index.js'],
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	output: {
		// publicPath: '/static/',
		path: resolve(__dirname, '../dist'),
		filename: '[name].js', // '[name].[chunkhash].js'
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
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
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
		
	],
	devtool: '#cheap-module-eval-source-map',
};


