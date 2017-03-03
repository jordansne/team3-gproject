const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main/js/index.jsx',
    output: {
        path: './grails-app/assets/javascripts',
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, './src/main/js'),
            loader: 'babel-loader',
            query: {
                presets: [
                    'es2015',
                    'react'
                ]
            }
        }]
    }
}
