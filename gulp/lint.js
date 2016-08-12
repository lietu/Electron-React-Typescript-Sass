var gulp = require('gulp');
var tslint = require('gulp-tslint');
var stylish = require('gulp-tslint-stylish');

gulp.task('lint', function () {
    gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: false,
            sort: true,
            bell: true
        }));
});
