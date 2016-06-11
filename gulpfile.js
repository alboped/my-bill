var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

var config = {
	port: 80
}

// 启动服务
gulp.task('open', function(){
	gulp.src('./index.html')
		.pipe(plugins.open({
			uri: 'http://gulp.dev'
		}));
});

// 连接服务
gulp.task('connect', function(){
	plugins.connect.server({
		root: './',
		port: config.port,
		host: 'gulp.dev',
		livereload: true
	});
});

// 刷新浏览器
gulp.task('reload', function(){
	gulp.src('./')
		.pipe(plugins.connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('./index.html', ['reload']);
});

gulp.task('default', ['open', 'connect', 'watch']);