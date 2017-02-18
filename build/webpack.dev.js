const merge = require('webpack-merge');
const dev = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');

let webpackConfig = merge(dev,{
	module: {
		/*rules: [{
			test: /\.sass$/,
			use: ['style-loader', 'css-loader', 'sass-loader?indentedSyntax&sourceMap']
		}, {
			test: /\.scss$/,
			use: ['css-loader', 'sass-loader']
		},{
			test : /\.css$/,
			use: ['style-loader', 'css-loader']
		}]*/
	},
	plugins: [
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
})

module.exports = webpackConfig;