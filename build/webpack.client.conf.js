const base = require('./webpack.base');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, '../src/entry-client/index.js')
    },
    target: 'web',
    output: {
        filename: 'js/client-entry.js',
        path: path.join(__dirname, '../dist')
    },

    plugins: [
        new VueClientPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.VUE_ENV': '"client"'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: "index.html"
        })
    ],
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity
        }
    }
});
