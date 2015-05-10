var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var connect = require('connect');
var http = require('http');
var rimraf = require('rimraf');
var lireReload = require('connect-livereload');
var modRewrite = require('connect-modrewrite');
var util = require('gulp-util');
var yargs = require('yargs');
var config = require('./config');
var $ = require('gulp-load-plugins')();

var args = yargs
  .alias('p', 'production')
  .argv;

var configuration;

gulp.task('env', function () {
  configuration = config(args.production ? false : true);
});

// fire up the connect middleware to plug into the server
gulp.task('connect', function () {
  var app = connect()
    .use(lireReload({port: configuration.httpServer.lrPort}))
    .use(modRewrite([
      '!(\\..+)$ / [L]'
    ]))
    .use(connect.static(configuration.dirs.build))
    .use(connect.directory(configuration.dirs.build));

  http.createServer(app)
    .listen(configuration.httpServer.port)
    .on('listening', function () {
      console.log('Started connect web server on ' + configuration.httpServer.host + ':' + configuration.httpServer.port);
    });
});

gulp.task('watch', ['connect'], function () {
  var server = $.livereload();

  // watch for changes
  gulp.watch([
    configuration.dirs.build + configuration.filename.js.application,
    configuration.dirs.build + configuration.filename.index
  ]).on('change', function (file) {
    console.log(file.path + ' changed');
    server.changed(file.path);
  });

  // run webpack whenever the source files changes
  gulp.watch(configuration.dirs.src + 'modules/**/*', ['repack']);
  gulp.watch(configuration.dirs.src + configuration.filename.index, ['html']);
});

// for development
gulp.task('webpack', function () {
  return gulp.src(configuration.dirs.src + 'modules/index.js')
    .pipe(gulpWebpack(configuration.webpack, webpack))
    .pipe(gulp.dest(configuration.dirs.build))
});

gulp.task('repack', ['webpack'], function () {
  return gulp.src(configuration.dirs + configuration.filename.js.application)
    .pipe($.size());
});

gulp.task('html', function () {
  return gulp.src(configuration.dirs.src + configuration.filename.index)
    .pipe(gulp.dest(configuration.dirs.build));
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
    .pipe($.concat(configuration.filename.js.vendor))
    .pipe($.size())
    .pipe(gulp.dest(configuration.dirs.build))
});

gulp.task('clear', function () {
  return rimraf.sync(configuration.dirs.build, util.log);
});

gulp.task('build', ['html', 'vendor']);

gulp.task('default', ['env', 'clear', 'build', 'webpack', 'watch']);