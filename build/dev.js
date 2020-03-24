const base = require('./webpack.base');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    mode: 'development',
    devtool: '#source-map',
    entry: {
        app: path.resolve(__dirname, '../src/entry-client/index.js')
    },
    target: 'web',
    output: {
        filename: 'js/client-entry.js',
        path: path.join(__dirname, '../dist')
    },

    devServer: {
        hot: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    plugins: [
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
