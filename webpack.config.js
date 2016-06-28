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
		publicPath: 'http://account.server.com:8080/dist',
		path: 'dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{ 
			test: /\.js$/, 
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			loader: 'style!css!autoprefixer!sass?outputStyle=compressed'
		}, {
			test: /\.(png|jpg)$/,
			exclude: /node_modules/,
			loader: 'url?limit=8192'
		}, {
			test: /\.json$/,
			exclude: /node_modules/,
			loader: 'json'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	]
}