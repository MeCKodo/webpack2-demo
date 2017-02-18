const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {}) => {
	
	return {
		entry: {
			index : './src/index.js',
			vendor : './src/vendor.js',
		},
		output : {
			publicPath: '/assets/',
			path : resolve(__dirname, 'dist'),
			filename : options.dev ? '[name].js' : '[name].js?[chunkhash]',
			chunkFilename: '[id].js?[chunkhash]',
		},
		module : {
			rules : [{
				test : /\.js$/,
				exclude : /node_modules/,
				use : ['babel-loader'],
			},{
				test : /\.html$/,
				use : 'html-loader'
			},{
				test : /\.css$/,
				use : ['style-loader', 'css-loader']
			},{
				test :  /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use : [{
					loader : 'url-loader',
					options : {
						limit : 10000
					}
				}]
			}]
		},
		plugins : [
			new HtmlWebpackPlugin({
				template : './src/index.html'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names : ['vendor', 'manifest']
			})
		],
		devServer : {
			port : 8100,
			historyApiFallback : {
				index: '/assets/'
			}
		}
	};
}