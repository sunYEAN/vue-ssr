const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
    target: 'node',
    entry: './src/entry-server/index.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: [/\.css$/, /\?vue&type=style/]
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
})
