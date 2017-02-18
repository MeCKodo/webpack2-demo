
module.exports = {
	rules : [{
		test: /\.css$/,
		use: ['style-loader', 'css-loader']
	}, {
		test: /\.scss$/,
		use: ['style-loader', 'css-loader', 'sass-loader']
	}]
};
