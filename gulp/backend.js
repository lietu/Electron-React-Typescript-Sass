var gulp = require("gulp");
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var settings = require("./settings");


Error.stackTraceLimit = Infinity;

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task("launcher", function () {
    return gulp.src(settings.paths.launcher.concat(settings.paths.typings))
        .pipe(plumber())
        .pipe(ts(tsProject))
        .pipe(gulp.dest("dist/"));
});

gulp.task("launcher-watch", ["launcher"], function () {
    gulp.watch(
        settings.paths.launcher.concat(settings.paths.typings),
        ["launcher"]).on('change', reportChange);
});
