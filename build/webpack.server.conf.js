const base = require('./webpack.base.conf');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(base, {
    mode: 'production',
    target: 'node',
    devtool: 'source-map',
    entry:  {
        main: path.resolve(__dirname, '../src/entry-server/index.js')
    },
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist')
    },
    // 防止将某些 import 的包(package)打包到 bundle 中，
    // 而是在运行时(runtime)再去从外部获取这些扩展依赖 (external dependencies)。
    externals: [
        'vue',
        'vuex',
        /\.css$/,
        'vue-router',
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.VUE_ENV': "server"
        }),
        new VueServerPlugin(),
    ]
});
