var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  del = require('del'),
  $ = gulpLoadPlugins(),
  sequence = require('run-sequence'),
  tsProject = $.typescript.createProject('src/tsconfig.json');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var paths = {
  tscript: ['src/**/*.ts'],
  html: 'src/**/index.html',
  css: 'src/assets/**/*.css',
  dist: {
    css: 'dist/assets',
    script: 'dist',
    html: 'dist'
  }
}

gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('build-ts', function () {
  return gulp.src(paths.tscript)
    .pipe($.inlineNg2Template({ base: '/src', useRelativePaths: true }))
    .pipe(tsProject())
    .pipe(gulp.dest('src'));
});

gulp.task('browserify', function () {
  var b = browserify({
    entries: './src/main.js'
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browserify:prod', function () {
  var b = browserify({
    entries: './src/main.js'
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build-index-html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist.html));
});

gulp.task('build-images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});


gulp.task('inject', function () {
  var target = gulp.src('dist/index.html');
  var vsources = gulp.src(['dist/vendor/**/*.js', 'dist/vendor/**/*.css'], { read: false });
  var msources = gulp.src(['dist/**/*.js', 'dist/**/*.css', '!dist/vendor/**'], { read: false });
  return target.pipe($.inject(msources, {relative: true}))
    .pipe($.inject(vsources, {relative: true, name: 'bower'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(done) {
  sequence('clean:dist', [ 'build-ts', 'build-index-html', 'build-css', 'build-images'], 'browserify:prod', done);
});