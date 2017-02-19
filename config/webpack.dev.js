const webpack = require('webpack');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	module : {
		rules : [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
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
