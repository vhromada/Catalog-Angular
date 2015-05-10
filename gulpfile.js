var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var connect = require('connect');
var http = require('http');
var rimraf = require('rimraf');
var lireReload = require('connect-livereload');
var modRewrite = require('connect-modrewrite');
var util = require('gulp-util');
var config = require('./config');
var $ = require('gulp-load-plugins')();

// fire up the connect middleware to plug into the server
gulp.task('connect', function () {
  var app = connect()
    .use(lireReload({port: config.gulp.httpServer.lrPort}))
    .use(modRewrite([
      '!(\\..+)$ / [L]'
    ]))
    .use(connect.static(config.gulp.dirs.build))
    .use(connect.directory(config.gulp.dirs.build));

  http.createServer(app)
    .listen(config.gulp.httpServer.port)
    .on('listening', function () {
      console.log('Started connect web server on ' + config.gulp.httpServer.host + ':' + config.gulp.httpServer.port);
    });
});

gulp.task('watch', ['connect'], function () {
  var server = $.livereload();

  // watch for changes
  gulp.watch([
    config.gulp.dirs.build + config.gulp.filename.js.application,
    config.gulp.dirs.build + config.gulp.filename.index
  ]).on('change', function (file) {
    console.log(file.path + ' changed');
    server.changed(file.path);
  });

  // run webpack whenever the source files changes
  gulp.watch(config.gulp.dirs.src + 'modules/**/*', ['repack']);
  gulp.watch(config.gulp.dirs.src + config.gulp.filename.index, ['html']);
});

// for development
gulp.task('webpack', function () {
  return gulp.src(config.gulp.dirs.src + 'modules/index.js')
    .pipe(gulpWebpack(config.webpack, webpack))
    .pipe(gulp.dest(config.gulp.dirs.build))
});

gulp.task('repack', ['webpack'], function () {
  return gulp.src(config.gulp.dirs + config.gulp.filename.js.application)
    .pipe($.size());
});

gulp.task('html', function () {
  return gulp.src(config.gulp.dirs.src + config.gulp.filename.index)
    .pipe(gulp.dest(config.gulp.dirs.build));
});

gulp.task('vendor', function () {
  return gulp.src([
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular/angular.js',
    'bower_components/oclazyload/dist/ocLazyLoad.js'
  ])
    .pipe($.order([
      'angular/angular.js',
      'angular-ui-router/release/angular-ui-router.js',
      'oclazyload/dist/ocLazyLoad.js'
    ], {base: './bower_components'}))
    .pipe($.concat(config.gulp.filename.js.vendor))
    .pipe($.size())
    .pipe(gulp.dest(config.gulp.dirs.build))
});

gulp.task('clear', function () {
  return rimraf.sync(config.gulp.dirs.build, util.log);
});

gulp.task('build', ['html', 'vendor']);

gulp.task('default', ['clear', 'build', 'webpack', 'watch']);