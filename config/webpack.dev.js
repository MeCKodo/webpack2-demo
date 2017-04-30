const webpack = require('webpack');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const vueLoaderConfig = require('./vue-loader')(isProduction);

module.exports = {
	entry: {
		index: ['webpack-hot-middleware/client?reload=true','./src/index.js'],
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	module : {
		rules : [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		}],
	},
	plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': '"development"'
		}),
		new FriendLyErrorsPlugin({
			compilationSuccessInfo: {
				messages: ['You application is running here http://localhost:3000'],
			},
		})
	]
};
