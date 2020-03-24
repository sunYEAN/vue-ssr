const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');

const config = merge(base, {
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // generate output HTML
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    optimization: {
        splitChunks: {
            name: 'vendor',
            minChunks: Infinity
        }
    }
});

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        // minify JS
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    )
}

module.exports = config
