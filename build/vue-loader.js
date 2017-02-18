const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports.pro = {
	loaders: {
		css: ExtractTextPlugin.extract({
			loader: 'css-loader?sourceMap',
			fallbackLoader: 'vue-style-loader'
		}),
		scss: ExtractTextPlugin.extract({
			loader: 'css-loader?sourceMap!sass-loader',
			fallbackLoader: 'vue-style-loader'
		})
	},
	postcss: [
		require('autoprefixer')({
			browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
		})
	]
};

module.exports.dev = {
	loaders: {
		css: 'vue-style-loader!css-loader',
		scss: 'vue-style-loader!css-loader!sass-loader',
	},
	postcss: [
		require('autoprefixer')({
			browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
		})
	]
};
