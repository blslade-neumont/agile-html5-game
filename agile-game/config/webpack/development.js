let { ContextReplacementPlugin, DefinePlugin } = require('webpack');
let path = require('path');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./common');
let clientConfig = require('./client-config');

//Loaders
let $awesomeTypescript = {
    loader: 'awesome-typescript-loader'
};

let devConfig = {
    entry: {
        'main': './src/main.browser.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../../docs')
    },

    plugins: [
        new DefinePlugin(clientConfig)
    ],

    module: {
        loaders: [
            { test: /\.ts$/, loaders: [$awesomeTypescript], exclude: /\.spec\.ts$/ }
        ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};

module.exports = webpackMerge(commonConfig, devConfig);
