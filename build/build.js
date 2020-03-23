const path = require('path');
const base = require('./webpack.base.conf');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = merge(base, {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../src/entry-client/index.js')
    },
    plugins: [
        // 捕获错误手写插件
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },

        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                // 避免 cssnano 重新计算 z-index
                safe: true,
                // cssnano 集成了autoprefixer的功能
                // 会使用到autoprefixer进行无关前缀的清理
                // 关闭autoprefixer功能
                // 使用postcss的autoprefixer功能
                autoprefixer: false
            },
            canPrint: true
        }),

        new CleanWebpackPlugin(),

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
            title: '生产环境'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            // 设置缓存的 chunks
            cacheGroups: {
                vendors: {
                    test: /(vue|vuex|vue-router|axios|mockjs)/,
                    name: 'vendor', // 分割出来要缓存的 chunks 名称
                }
            }
        }
    }
});


module.exports = config;
