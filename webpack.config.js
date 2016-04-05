var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + "/public",
    entry: {
        angular2_polyfils: './utils/angular2_polyfils.ts',
        app: './http/app.ts',
        app_style: './http/sass/style.scss'

    },
    output: {
        path: __dirname + '/public/dist/',
        filename: '[name].js',
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
                exclude: [/libs/, /node_modules/, /tmp/, /typings/, /test/]
            },
            {
                test: /\.html$/,
                loader: 'raw!html'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|png|gif)/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    resolve: {
        fallback: path.join(__dirname, "node_modules"),
        extensions: ['', '.ts', '.js'],
        alias:{
            //add any aliases to the libraries in cases when node modules do not work
        },
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    externals: {
        //"jquery": "jQuery"
    },
    devServer: {
        hot: true,
        stats: {
            colors: true
        }
    }
};