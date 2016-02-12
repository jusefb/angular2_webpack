var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + "/public",
    entry: {
        angular2_polyfils: './utils/angular2_polyfils.ts',
        tour_of_heroes: './tour_of_heroes/boot.ts',
        tour_of_heroes_style: './tour_of_heroes/sass/style.scss',
        inventory_app: './inventory_app/boot.ts',
        inventory_app_style: './inventory_app/sass/style.scss',
        forms: './forms/forms.ts',
        forms_style: './forms/sass/style.scss',
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
                exclude: [/libs/, /node_modules/, /tmp/, /typings/]
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
                test: /\.(otf|eot|svg|ttf|woff|png)/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        fallback: path.join(__dirname, "node_modules"),
        extensions: ['', '.ts', '.js'],
        alias:{
            //add any aliases to the libraries in cases when node modules do not work
        },
        modulesDirectories: ['public/libs','node_modules']
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