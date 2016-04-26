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
var Server = require('karma').Server;

gulp.task('default', ['run_main_app']);

/*
* Run the main application
* */
gulp.task('run_main_app', function(){
    argv.jsPath = 'src/';
    argv.appName = 'main_app';
    argv.mainComponentTag = 'main-app';
    argv.liveReload = true;
    gulp.start('run');
});

/*
* This comand allows to run differnet applications within this project (primarily when looking at examples, all the below parameters can be passed to the gulp task --[variable] syntax
*
* @appName {string} - The name of the application, this will be used to name the main Webpack entry file
* @jsPath {string} - The path to the main entry file
* @mainComponentTag - The html tag of the main angular 2 component of the application
* @liveReload - Whether you want to run the app in live reload, note that you will have to configure proxy settings with the webpackconfig.js and run the app on the webpack-dev-server
* */
gulp.task('run', function(){
    var appName = argv.appName;
    var mainComponentTag = argv.mainComponentTag;
    var production = argv.production;
    
    if(!appName)
        throw "appName was not passed to the task";

    if(!mainComponentTag)
        throw "mainComponentTag name was not passed to the task";

    var mainEntryFileName = appName + '.js';

    //in production files will be placed in the dist folder and read from there
    if(production)
        gulp.start('webpack:build');
    else
        gulp.start('webpack-dev-server');

    //Note if you are moving this to another serverside technology cahnge these calls
    //we need to set the path of the js file that will be injected into the layout server side template
    changeJsPath('server/views/layout.hbs', 'server/views/', production, mainEntryFileName);

    //we need to update the index server side view with the
    setMainComponent('server/views/index.hbs', 'server/views/', mainComponentTag)
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

gulp.task("webpack:build-dev", function (callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = "cheap-source-map";
    myDevConfig.debug = true;

    myDevConfig.entry = {
        app: jsPath + 'boot.ts'
    };

    var devCompiler = webpack(myDevConfig);

    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    var appName = argv.appName;

    var devServerLocation = getWebPackDevServerPath();

    //configure the dynamic values of the Webpack.config
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "cheap-source-map";
    myConfig.debug = true;
    myConfig.output.publicPath = webpackConfig.devServer.publicPath;
    //configure app for live reload 
    if(argv.liveReload){
        myConfig.entry[appName] =
            [
                'webpack/hot/dev-server',
                'webpack-dev-server/client?' + devServerLocation,
                webpackConfig.entry[appName][0]
            ];
    }

    // Start a webpack-dev-server
    var compiler = webpack(myConfig);

    new WebpackDevServer(compiler, webpackConfig.devServer).listen(webpackConfig.devServer.port, webpackConfig.devServer.host, function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", devServerLocation + "/webpack-dev-server/index.html");
        // keep the server alive or continue?
        callback();
    });
});

/**
 * Run unit tests of the application
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

/*
* This function will add the main js Webpack entry file to the specified server side view
* */
function changeJsPath(srcFilePath, destPath, production, jsPath) {
    var jsBundleName = jsPath;
    var dirName = !production ? getWebPackDevServerPath() + webpackConfig.output.publicPath : webpackConfig.output.publicPath;
    gulp.src(srcFilePath)
        .pipe(htmlreplace({
            'js': [dirName + 'angular2_polyfils.js', dirName + jsBundleName]
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest(destPath));
}

/*
* This function will add the html tag for the main component of your application
* */
function setMainComponent(srcFilePath, destPath, mainComponentTagName) {
    return gulp.src(srcFilePath)
        .pipe(htmlreplace({
            main: {
                src: null,
                tpl: '<' + mainComponentTagName + '>Loading ...</' + mainComponentTagName + '>'
            }
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest(destPath));
}

function getWebPackDevServerPath() {
    var devServerLocation = (webpackConfig.devServer.https ? 'https' : 'http') + '://' + webpackConfig.devServer.host + ':' + webpackConfig.devServer.port;

    return devServerLocation;
}
