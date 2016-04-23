var webpack = require('webpack');

var path = require('path');
module.exports = {
    context: __dirname + "/client",
    entry: {
        angular2_polyfils: './src/shared/angular2_polyfils.ts',
        main_app: ['./src/boot.ts'] //needs to be ab array to ease liveReload gulp configuration
    },
    output: {
        path: __dirname + '/client/dist/',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"]
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
                loader: ["style-loader", "css-loader!sass-loader"]
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
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
    },
    devServer: {
        publicPath: '/dist/',
        hot: true,
        inline: true,
        stats: {
            colors: true
        },
        debug: true,
        https: false,
        host: 'localhost',
        port: 8888,
        proxy:[
            {
                path: "*", target: "http://localhost:3000"
            }
        ]
    }
};