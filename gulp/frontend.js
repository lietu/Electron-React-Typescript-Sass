var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config");
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var plumber = require('gulp-plumber');
var settings = require("./settings");

webpackConfig.target = webpackTargetElectronRenderer(webpackConfig);

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Caching
var devCompiler;
gulp.task("webpack:build-dev", function (callback) {
    if (!devCompiler) {
        // modify some webpack config options
        var myDevConfig = Object.create(webpackConfig);
        myDevConfig.devtool = "sourcemap";
        myDevConfig.debug = true;

        devCompiler = webpack(myDevConfig)
    }

    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});
