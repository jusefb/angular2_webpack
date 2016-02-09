var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('./node_modules/gulp-jshint');
var concat = require('./node_modules/gulp-concat');
var inject = require('gulp-inject');
var prettify = require('gulp-prettify');

var argv = require('yargs').argv;

var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var _ = require('lodash');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var fs = require('fs');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

gulp.task('default', ['webpack-dev-server-shell']);

gulp.task('webpack-dev-server-shell', shell.task([
    'webpack-dev-server'
]));

/*
 * This task will analyse js files for syntatic mystakes
 * */
gulp.task('jshint', function () {
    return gulp.src('./client/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bowerKarma', function () {
    var files = [];
    var bowerFiles = lib({main: []}).ext('js').files;
    files = files.concat(bowerFiles);
    var sources = gulp.src(files, {read: false});

    gulp.src('./client/karma.conf.js').pipe(inject(sources, {
        starttag: '//inject:bower', endtag: '//endinject:bower', transform: function (filepath, file, i, length) {
            return '{pattern: "' + filepath.replace(/\/client\//g, '') + '", included: false},';
        }
    }))
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest('./client/', {overwrite: true}));

    var modulesCreated = [];

    gulp.src('./client/test/test.config.js').pipe(inject(sources, {
        starttag: '//inject:bower', endtag: '//endinject:bower', transform: function (filepath, file, i, length) {
            var moduleName = filepath.split("/").pop().replace('.js', '').replace('.min', '');

            if(!_.contains(modulesCreated, moduleName)) {
                modulesCreated.push(moduleName);
                return '"' + moduleName + '": "' + filepath.replace(/\/client\//g, '../').replace('.js', '') + '",';
            }
        }
    }))
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest('./client/test', {overwrite: true}));
});

gulp.task('addSrcFilesToKarma', function () {
    var files = [
        './client/src/main.js',
        './client/src/**/*.js',
        './client/src/*.js'];
    var sources = gulp.src(files, {read: false});

    gulp.src('./client/karma.conf.js').pipe(inject(sources, {
        starttag: '//inject:src', endtag: '//endinject:src', transform: function (filepath, file, i, length) {
            return '{pattern: "' + filepath.replace(/\/client\//g, '') + '", included: false}' + (i + 1 < length ? ',' : '');
        }
    }))
        .pipe(prettify({mode: 'VERIFY_AND_WRITE'}))
        .pipe(gulp.dest('./client/', {overwrite: true}));
});

gulp.task('prepareKarmaConfig', ['addSrcFilesToKarma', 'bowerKarma']);

gulp.task("webpack:build", function(callback) {
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
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        if(myConfig.profile) {
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

gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {

    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "inline-source-map";
    myConfig.debug = true;
    //myConfig.entry = myConfig.entry.push('webpack/hot/dev-server');
    // Start a webpack-dev-server
    var compiler = webpack(myConfig);

    new WebpackDevServer(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        //contentBase: "client/"
        hot: true,
        inline: true
    }).listen(8080, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            // Server listening
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

            // keep the server alive or continue?
            callback();
        });
});

gulp.task('compileMaterialize', function () {
    gulp.src('./client/libs/materialize/sass/materialize.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/libs/materialize/dist/css'));
});

