var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
// var coffee = require('gulp-coffee');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
 
var paths = {
  css: 'css/**/*.css',
  images: 'img/**/*',
  fonts: 'css/fonts/**/*.*'
};
 
gulp.task('cleanCss', function() {
  return del(['public/assets/css', 'public/assets/img']);
});
 
gulp.task('css', ['cleanCss'], function() {
  gulp.src(paths.css)
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/assets/css'))
});

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('public/assets/fonts'))
});
 
gulp.task('cleanImages', function() {
  return del(['public/assets/css', 'public/assets/img']);
});

gulp.task('images', ['cleanImages'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 1}))
    .pipe(gulp.dest('public/assets/img'));
});

gulp.task('imagesProduction', ['cleanImages'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest('public/assets/img'));
});
 
// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.images, ['images']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'css', 'images', 'fonts']);

gulp.task('production', ['css', 'imagesProduction']);