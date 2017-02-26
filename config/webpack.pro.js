const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin({ filename: 'static/css/[name].[contenthash].css' })
const extractVueStyle = new ExtractTextPlugin({ filename: 'static/css/vue-style.[contenthash].css',allChunks: true })

const isProduction = process.env.NODE_ENV === 'production';
const vueLoaderConfig = require('./vue-loader')(isProduction, extractVueStyle);

module.exports = {
	output : {
		path: path.resolve(__dirname, '../dist'),
		publicPath: require('./cdn'),
		filename: 'static/js/[name].[chunkhash].js', // '[name].[chunkhash].js?'
		chunkFilename: 'static/js/[id].js?[chunkhash]',
	},
	devtool: '#source-map',
	module : {
		rules : [{
			test: /\.css$/,
			use: extractCss.extract({
				fallbackLoader: "style-loader",
				loader: "css-loader!postcss-loader"
			})
		},{
			test: /\.scss$/,
			use: extractCss.extract({
				fallbackLoader: "style-loader",
				loader: "css-loader!postcss-loader!sass-loader"
			})
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
		}),
		extractCss,
		extractVueStyle,
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
