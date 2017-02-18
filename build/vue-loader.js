const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = process.env.NODE_ENV !== 'production' ? {
		loaders: {
			css: 'vue-style-loader!css-loader',
			scss: 'vue-style-loader!css-loader!sass-loader',
		},
	} : {
		loaders: {
			css: ExtractTextPlugin.extract({
				loader: 'css-loader',
				fallbackLoader: 'vue-style-loader'
			}),
			scss: ExtractTextPlugin.extract({
				loader: 'css-loader!sass-loader',
				fallbackLoader: 'vue-style-loader'
			})
		},
		postcss: [
			require('autoprefixer')({
				browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
			})
		]
	};
		