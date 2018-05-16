// Gulp modules / dependencies
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var nunjucksRender = require('gulp-nunjucks-render');
var gulpdata = require('gulp-data');

// All config defined
var config = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
  htmlin: 'src/*.html',
  scssin: 'src/scss/**/*.scss',
  bootstrapscssin: 'node_modules/bootstrap/scss/**',
  fontscssin: 'node_modules/font-awesome/css/font-awesome.*',
  fontsin: 'node_modules/font-awesome/fonts/fontawesome-webfont.*',
  videosin: 'src/videos/**',
  nunjucksin: 'src/pages/**/*.+(html|partials)',
  cssout: 'dist/css/',
  jsout: 'dist/js/',
  imgout: 'dist/img/',
  htmlout: 'dist/',
  videosout: 'dist/videos/',
  scssout: 'src/css/',
  bootstrapscssout: 'src/scss/',
  fontscssout: 'src/css/',
  fontsout: 'src/fonts/',
  cssoutname: 'style.css',
  jsoutname: 'script.js',
  cssreplaceout: 'css/style.css',
  jsreplaceout: 'js/script.js'
};

// Gulp - clean and reset for each build / watch
gulp.task('clean', function() {
  return del([config.dist]);
});

// Gulp - build script for 'html' 'js' 'css' 'img' tasks including 'clean'
gulp.task('build', function() {
  sequence('clean', ['html', 'js', 'css', 'img', 'videos']);
});

// Gulp - default script and using 'serve' task
gulp.task('default', ['serve', 'fonts']);

// Gulp + Browsersync
gulp.task('reload', function() {
  browserSync.reload();
});

// Gulp + Browsersync + SASS
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: config.src
  });

  gulp.watch([config.htmlin, config.jsin], ['reload']);
  gulp.watch(config.scssin, ['sass']);
});

// Gulp + SASS
gulp.task('sass', function() {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout))
    .pipe(browserSync.stream());
});

// Gulp - output css from sass
gulp.task('css', function() {
  return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout));
});

// Gulp - output JS and minified
gulp.task('js', function() {
  return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout));
});

// Gulp - output images and minified / compressed
gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

// Gulp - output html
gulp.task('html', function() {
  return gulp.src(config.htmlin)
    .pipe(htmlReplace({
      'css': config.cssreplaceout,
      'js': config.jsreplaceout
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist))
});

// Gulp - output / retrieve bootstrap sass
// ** Only use this for manual first-time load bootstrap sass
// WIP solution
gulp.task('bootstrap-sass', function() {
  return gulp.src(config.bootstrapscssin)
    .pipe(gulp.dest(config.bootstrapscssout));
});

// Gulp - output / retrieve font-awesome fonts
gulp.task('fonts', function() {
  return gulp.src([config.fontsin, config.fontscssin])
    .pipe(gulp.dest(config.fontsout));
});

// Gulp - output / retrieve videos
gulp.task('videos', function() {
  return gulp.src(config.videosin)
    .pipe(gulp.dest(config.videosout));
});

// Gulp - using gulp-nunjucks-render dependency
// ** Note: Use this only to build dev templates & partials
gulp.task('nunjucks', function() {
  // Gets .html and .partials files in pages - stored in pages folder
  return gulp.src(config.nunjucksin)
    // Adding data to Nunjucks
    .pipe(gulpdata(function() {
      return require('./src/data.json')
    }))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    // output files in src folder
    .pipe(gulp.dest(config.src))
});
