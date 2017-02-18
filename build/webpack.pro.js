const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
	output : {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/cdnnnnnn',
		filename: 'static/js/[name].[chunkhash].js', // '[name].[chunkhash].js?'
		chunkFilename: 'static/js/[id].js?[chunkhash]',
	},
	devtool: '#source-map',
	module : {
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
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'static/css/[name].css', allChunks: true }),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					require('autoprefixer')({
						browsers: ['last 20 versions', 'safari 5', 'opera 12.1', 'ios 7', 'android 4', '> 10%']
					}),
					require('cssnano'),
				]
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': '"production"'
		}),
	]
};
