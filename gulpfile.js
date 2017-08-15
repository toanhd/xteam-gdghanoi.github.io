// npm install --global gulp
// npm install


// npm i --save-dev gulp
// npm i --save-dev gulp-sass

// npm install --save-dev gulp-cssnano 
// npm install --save-dev gulp-rename
// npm install --save-dev gulp-watch
// npm install --save-dev gulp-uglify
// npm install --save-dev browser-sync 
// npm install --save-dev gulp-plumber 


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();
var handleErrors;

gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename(function(path) {
            // path.dirname += "/css";
            // path.basename += "-goodbye";
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());

});

gulp.task('js', function() {
    return gulp.src('temp-js/*.js')
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(uglify())
        .pipe(rename(function(path) {
            // path.dirname += "/js";
            // path.basename += "-goodbye";
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());

});

gulp.task('serve', ['sass', 'js'], function() {
    browserSync.init({
        server: './',
    });
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['temp-js/*.js'], ['js']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);