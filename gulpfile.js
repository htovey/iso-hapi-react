var $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream');

gulp.task('scripts', function () {
  var b = browserify()
    .transform(require('reactify'))
    .require('react', { expose: 'react' })
    .require('./app/TodoApp.js', { expose: './app/TodoApp' })
    .add('app/TodoApp.js');

  return b.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['scripts']);
