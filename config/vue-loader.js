
module.exports = function(production,extractVueStyle) {
	return !production ? {
		loaders: {
			css: 'vue-style-loader!css-loader',
			scss: 'vue-style-loader!css-loader!sass-loader',
		},
	} : {
		loaders: {
			css: extractVueStyle.extract({
				loader: 'css-loader',
				fallbackLoader: 'vue-style-loader'
			}),
				scss: extractVueStyle.extract({
				loader: 'css-loader!sass-loader',
				fallbackLoader: 'vue-style-loader'
			})
		},
		postcss: [
			require('autoprefixer')({
				browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
			}),
			require('cssnano')
		]
	}
};
		