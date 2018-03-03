const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['./', 'node_modules']
    },

    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    failOnHint: true
                }
            }, {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{from: 'web', to: './'}])
    ],
    context: path.join(__dirname, './'),
    devServer: {
        open: true,
        port: 8081,
    }
};