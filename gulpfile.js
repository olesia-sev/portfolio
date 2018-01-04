const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const svgstore = require('gulp-svgstore');
const path = require('path');

const ttf2woff = require('gulp-ttf2woff');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'build/assets/images/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  },
  fonts: {
    src: 'src/fonts/woff/**/*.*',
    dest: 'build/assets/fonts/'
  }
}

//pug
function templates() {
  return gulp
    .src(paths.templates.pages)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.root));
}

//scss
function styles() {
  return gulp
    .src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

//fonts 
// function ttfToWoff() {
//   gulp.src(paths.fonts.src)
//     .pipe(ttf2woff())
//     .pipe(gulp.dest(paths.fonts.src))
// }

//svg
function svg() {
  return gulp
      .src('./src/images/icons/*.svg')
      .pipe(svgstore())
      .pipe(gulp.dest(paths.images.dest));
}

//clean
function clean() {
  return del(paths.root);
}

//browser-sync, gulp вотчер
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
}

//локальный сервер, встроенный
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//переносим картинки
function images() {
  return gulp.src(paths.images.src)
      .pipe(gulp.dest(paths.images.dest));
}

//переносим шрифты
function fonts() {
  return gulp.src(paths.fonts.src)
      .pipe(gulp.dest(paths.fonts.dest));
}

//scripts, webpack
function scripts() {
  return gulp.src('src/scripts/app.js')
      //.pipe(gulpWebpack(webpackConfig, webpack)) 
      .pipe(gulp.dest(paths.scripts.dest));
}

exports.templates = templates;

exports.styles = styles;

exports.clean = clean;

exports.images = images;

exports.fonts = fonts;

exports.svg = svg;

exports.scripts = scripts;

exports.watch = watch;

exports.server = server;

//exports.ttfToWoff = ttfToWoff;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, templates, images, fonts, svg, scripts),
  gulp.parallel(watch, server)
));
