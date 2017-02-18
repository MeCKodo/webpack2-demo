const webpack = require('webpack');
const path = require('path');

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
		new webpack.DefinePlugin({
			'process.env': '"development"'
		}),
	]
};
