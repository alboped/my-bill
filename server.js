var webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	config = require('./webpack.config'),
	express = require('express'),
	child_process = require('child_process');

var app = new (express)();
var port = 8080;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/dist', express.static('dist'));
app.use('/img', express.static('img'));
app.use('/data', express.static('data'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error){
	if(error){
		console.log('error');
	} else {
		console.log("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}

	/* 打开浏览器 */
	child_process.exec("start http://account.server.com:8080");
});
