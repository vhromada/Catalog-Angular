'use strict';

const del = require('del');
const gulp = require('gulp');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
var tscConfig = require('./tsconfig.json');

gulp.task('clean:src', function () {
    return del(['app/**/*.js', 'app/**/*.js.map']);
});

gulp.task('clean:dist', ['clean:src'], function () {
    return del('dist');
});

gulp.task('compile', ['clean:dist'], function () {
    return gulp
        .src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:assets', ['compile'], function () {
    return gulp.src(['app/**/*.html', 'app/**/*.css', 'styles.css', '!app/**/*.ts'], {base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:libs', ['copy:assets'], function () {
    gulp.src([
        'node_modules/@angular/common/bundles/common.umd.min.js',
        'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
        'node_modules/@angular/core/bundles/core.umd.min.js',
        'node_modules/@angular/forms/bundles/forms.umd.min.js',
        'node_modules/@angular/http/bundles/http.umd.min.js',
        'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
        'node_modules/@angular/router/bundles/router.umd.min.js',

        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/systemjs/dist/system.js',

        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]).pipe(gulp.dest('dist/libs'));

    gulp.src(['node_modules/rxjs/**/*.js'])
        .pipe(gulp.dest('dist/libs/rxjs'));
});

gulp.task('boot-bundle', ['copy:libs'], function () {
    gulp.src(['systemjs.prod.config.js', 'systemjs-angular-loader.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('replace', ['boot-bundle'], function () {
    gulp.src('index.html')
        .pipe(replace('node_modules/', ''))
        .pipe(replace('bootstrap/dist/css/bootstrap.css', 'libs/bootstrap.min.css'))
        .pipe(replace('core-js/client/shim.js', 'libs/shim.min.js'))
        .pipe(replace('zone.js/dist/zone.js', 'libs/zone.min.js'))
        .pipe(replace('systemjs/dist/system.src.js', 'libs/system.js'))
        .pipe(replace('systemjs.config.js', 'systemjs.prod.config.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['replace']);
