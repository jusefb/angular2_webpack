var gulp = require('gulp');
var watch = require('gulp-watch');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var _ = require('lodash');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var fs = require('fs');
var shell = require('gulp-shell');
var htmlreplace = require('gulp-html-replace');
var webpackConfig = require("./webpack.config.js");

gulp.task('default', ['webpack-dev-server-shell']);

gulp.task('webpack-dev-server-shell', shell.task([
    'webpack-dev-server --hot --inline'
]));

gulp.task('tour_of_heroes', function(){
    argv.jsPath = 'tour_of_heroes.js';
    argv.cssPath = 'tour_of_heroes_style.css';
    argv.production = 'false';
    gulp.start('webpack-dev-server-shell');
    gulp.start('change_css_js_paths')
});

gulp.task('run', function(){
    var appName = argv.appName;

    if(!appName)
        throw "appName was not passed to the task";

    argv.jsPath = appName + '.js';
    argv.cssPath = appName + '_style.css';
    argv.production = 'false';
    gulp.start('webpack-dev-server');
    gulp.start('change_css_js_paths')
});

gulp.task('tour_of_heroes:build', function(){
    argv.jsPath = 'tour_of_heroes.js';
    argv.cssPath = 'tour_of_heroes_style.css';
    argv.production = 'true';

    gulp.start('webpack:build');
    gulp.start('change_css_js_paths')
});

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.profile = false;
    myConfig.json = "stats.json";
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false})
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        if (myConfig.profile) {
            fs.writeFile("stats.json", JSON.stringify(stats.toJson()), function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        }

        callback();
    });
});

// create a single instance of the compiler to allow caching
// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function (callback) {
    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        chageCssJsPaths(true);
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    var jsPath = argv.jsPath;
    var cssPath = argv.cssPath;
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "inline-source-map";
    myConfig.debug = true;

    // Start a webpack-dev-server
    var compiler = webpack(myConfig);

    new WebpackDevServer(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        hot: true,
        inline: true
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        chageCssJsPaths(false, jsPath, cssPath);
        // keep the server alive or continue?
        callback();
    });
});

gulp.task('change_css_js_paths', function () {
    var production = !argv.production;
    var jsPath = argv.jsPath;
    var cssPath = argv.cssPath;
    return chageCssJsPaths(production, jsPath, cssPath);
});

function chageCssJsPaths(production, jsPath, cssPath) {
    var jsBundleName = jsPath;//"main_module.bundle.js";
    var cssBundleName = cssPath;//"main_module.css";
    var dirName = !production ? 'http://localhost:8080/dist/' : 'dist/';
    return gulp.src('views/layout.hbs')
        .pipe(htmlreplace({
            'js': [dirName + 'angular2_polyfils.js', dirName + jsBundleName],
            'css': [dirName + cssBundleName],
            'main': 'testing'
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest('views/'));
}
