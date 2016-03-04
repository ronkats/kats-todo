var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    copy = require('gulp-copy');

gulp.task('styles', function () {
    return gulp.src('css/**/*.css')
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

//TODO: copy libs

gulp.task('images', function () {
    return gulp.src('/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function () {
    return del(['dist/css', 'dist/js', 'dist/img']);
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(['lib/**/*','index.html','readme.md'], {
        base: 'lib'
    }).pipe(gulp.dest('dist/lib'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('css/**/*.css', ['styles']);
    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('/img/**/*', ['images']);
});