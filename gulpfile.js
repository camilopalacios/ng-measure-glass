var gulp = require('gulp');
var minify = require('gulp-minify');
var iife = require('gulp-iife');
var rename = require('gulp-rename');

gulp.task('default', ['scripts','demo']);

gulp.task('scripts', function(){
  return gulp.src('src/ng-measure-glass.js')
  .pipe(minify({
    ext:{
      src: '.js',
      min: '.min.js'
    },
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('demo', function(){
  return gulp.src('src/controller.js')
  .pipe(iife())
  .pipe(rename('demo.js'))
  .pipe(gulp.dest('./demo'));
});
