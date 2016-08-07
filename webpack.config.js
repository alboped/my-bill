var webpack = require('webpack'),
	htmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	path = require('path');

var config = {
	url: 'http://account.server.com',
	port: 8080
}

module.exports = {
	// devtool: 'source-map',
	devtool: 'cheap-module-eval-source-map',
	// watch: true,
	entry: [
		// 'webpack-dev-server/client?' + config.url + ':' + config.port,//资源服务器地址
		// 'webpack/hot/only-dev-server',
		'webpack-hot-middleware/client?reload=true',
		'./src/index.jsx'
	],
	output: {
		// publicPath: config.url + ':' + config.port,
		publicPath: '/static/',
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{ 
			test: /\.(js|jsx)$/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css!autoprefixer'
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			loader: 'style!css!autoprefixer!sass?outputStyle=compressed'
		}, {
			test: /\.less$/,
			loader: 'style!css!less-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url?limit=200000&minetype=application/font-woff" 
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', 'less']
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.UglifyJsPlugin()
		// new ExtractTextPlugin('style.css'),
	]
}