var gulp = require("gulp");
var webpack = require("webpack");
var plumber = require('gulp-plumber');
var settings = require("./settings");


// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("frontend-watch", ["webpack:build-dev"], function () {
    gulp.watch(settings.paths.client.concat(settings.paths.typings),
        ["webpack:build-dev"])
        .on('change', reportChange);
});

gulp.task("launcher-watch", ["launcher"], function () {
    gulp.watch(settings.paths.launcher.concat(settings.paths.typings),
        ["launcher"])
        .on('change', reportChange);
});

gulp.task('sass-watch', ["sass"], function () {
  gulp.watch('./style/**/*.scss', ['sass']);
});

gulp.task("watch-all", ["frontend-watch", "launcher-watch", "sass-watch"]);
