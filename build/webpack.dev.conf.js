const path = require('path');
const base = require('./webpack.base.conf');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, '../src/entry-client/index.js')
    },
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        historyApiFallback: true,
        stats: "minimal",
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    plugins: [
        // DefinePlugin 允许创建一个在编译时可以配置的全局常量。
        // 这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
        // 如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。
        // 这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.VUE_ENV': '"client"'
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: "index.html",
            title: '开发环境'
        })
    ]
});
