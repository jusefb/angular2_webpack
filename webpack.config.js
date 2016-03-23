var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + "/public",
    entry: {
        angular2_polyfils: './utils/angular2_polyfils.ts',
        //tour_of_heroes: './tour_of_heroes/boot.ts',
        //tour_of_heroes_style: './tour_of_heroes/sass/style.scss',
        //inventory_app: './inventory_app/boot.ts',
        //inventory_app_style: './inventory_app/sass/style.scss',
        //forms: './forms/boot.ts',
        //forms_style: './forms/sass/style.scss',
        //reactive: './reactive_programming/main.ts',
        //reactive_style: './reactive_programming/sass/style.scss',
        //chat: './rxjs/chat/app/app.ts',
        //chat_style: './rxjs/chat/app/sass/style.scss',
        http: './http/app.ts',
        http_style: './http/sass/style.scss',
        youtube_search: './youtube_search/app.ts',
        youtube_search_style: './youtube_search/sass/style.scss',
        //ngRx: './ngRx/boot.ts',
        //ngRx_style: './ngRx/sass/style.scss',
        router: './router/main.ts',

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