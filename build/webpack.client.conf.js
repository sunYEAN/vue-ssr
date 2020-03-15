const base = require('./webpack.base.conf');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    entry: {
        client: path.resolve(__dirname, '../src/entry-server/index.js')
    },
    target: 'web',
    output: {
        filename: 'client-entry.js',
        path: path.join(__dirname, '../dist')
    },

    plugins: [
        new VueClientPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.VUE_ENV': '"server"'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: "index.client.html"
        })
    ],
    optimization: {
        splitChunks: {
            name: 'manifest',
            minChunks: Infinity
        }
    }
});
