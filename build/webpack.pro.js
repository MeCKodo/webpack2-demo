const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
	output : {
		filename: '[name].[chunkhash].js', // '[name].[chunkhash].js?'
	},
	devtool: '#source-map',
	rules : [{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallbackLoader: "style-loader",
			loader: "css-loader!postcss-loader"
		})
	},{
		test: /\.scss$/,
		use: ExtractTextPlugin.extract({
			fallbackLoader: "style-loader",
			loader: "css-loader!postcss-loader!sass-loader"
		})
	}],
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
					require('autoprefixer')({
						browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
					})
				]
			}
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
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	]
};
