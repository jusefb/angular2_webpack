var BowerWebpackPlugin = require("bower-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + "/public",
    entry: {
        main: './src/boot.ts',
        main_style: './stylesheets/style.scss'
    },
    output: {
        path: __dirname + '/public/dist/',
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: [/libs/, /node_modules/, /tmp/, /typings/]
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './client', 'src')) + '/!html'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        fallback: path.join(__dirname, "node_modules"),
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
        alias:{
        },
        modulesDirectories: ['public/libs','node_modules']
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: ["libs"],
            manifestFiles: "bower.json",
            includes: /.*/,
            excludes: [],
            searchResolveModulesDirectories: false
        }),
        new ExtractTextPlugin("[name].css")
    ],
    externals: {
        //"jquery": "jQuery",
        "lodash": "_",
        "moment": "moment",
        //"angular": "angular"
    },
    devServer: {
        hot: true,
        inline: true,
        stats: {
            colors: true
        }
    }
};