var webpack = require('webpack'),
	htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	output: {
		publicPath: 'http://account.server.com:8080',
		path: 'dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{ 
			test: /\.js$/,
			loader: 'babel'
		}, {
			test: /\.scss$/,
			loader: 'style!css!autoprefixer!sass?outputStyle=compressed'
		}, {
			test: /\.css$/,
			loader: 'style!css!autoprefixer'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}, {
			test: /\.json$/,
			loader: 'json'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()/*,
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})*/
	]
}