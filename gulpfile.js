var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	config = {
		uri: 'http://account.server.com',
		port: 8080,
		dist: './dist/**/*'
	};

// 启动服务
gulp.task('open', function(){
	gulp.src('./index.html')
		.pipe(plugins.open({
			uri: config.uri + ':' + config.port,
			app: 'chrome'
		}));
});

// 连接服务
gulp.task('connect', function(){
	plugins.connect.server({
		root: './',
		port: config.port,
		livereload: true
	});
});

// 刷新浏览器
gulp.task('reload', function(){
	gulp.src(config.dist)
		.pipe(plugins.connect.reload());
});

// 监听文件
gulp.task('watch', function(){
	gulp.watch(config.dist, ['reload']);
});

// 默认任务
gulp.task('default', ['open', 'connect', 'watch']);