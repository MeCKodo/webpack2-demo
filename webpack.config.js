const { resolve } = require('path');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const FriendLyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let vueLoaderConfig = process.env.NODE_ENV !== 'production' ? {
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
let base = {
	entry: {
		index: './src/index.js',
		vendor: ['vue', 'vue-router', 'vuex'],
	},
	output: {
		publicPath: '/assets/',
		path: resolve(__dirname, 'dist'),
		filename: '[name].js', // '[name].[chunkhash].js?'
		chunkFilename: '[id].js?[chunkhash]',
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.(js|vue|jsx)$/,
			loader: 'eslint-loader',
			enforce: "pre",
			include: ['./src'],
			options: {
				formatter: eslintFriendlyFormatter
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader'],
		}, {
			test: /\.html$/,
			use: 'html-loader'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true }),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new FriendLyErrorsPlugin()
	],
	devServer: {
		port: 3000,
		historyApiFallback: {
			index: '/assets/'
		}
	},
	devtool: '#cheap-module-eval-source-map',
};
let dev = {
	rules : [{
		test: /\.css$/,
		use: ['style-loader', 'css-loader']
	}, {
		test: /\.scss$/,
		use: ['style-loader', 'css-loader', 'sass-loader']
	}]
};
let pro = {
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

if(process.env.NODE_ENV !== 'production') { // dev
	base.module.rules = base.module.rules.concat(dev.rules);
} else { // production
	base.devtool = pro.devtool;
	base.module.rules = base.module.rules.concat(pro.rules);
	base.plugins = base.plugins.concat(pro.plugins);
}
console.log(base.module.rules)
module.exports = base;
