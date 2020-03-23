const path = require('path');
const webpack = require('webpack');
const AutoPrefixer = require('autoprefixer');
// const VueClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //@next版本
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: 'production',
    stats: "errors-only",
    // devtool: 'source-map',
    entry: path.resolve(__dirname, '../src/entry-server/index.js'),
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/',
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            utils: path.resolve(__dirname, '../client/utils'),
            service: path.resolve(__dirname, '../client/services')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
                // extract-text-webpack-plugin@next
                // use: ExtractTextPlugin.extract({
                //     fallback: 'vue-style-loader',
                //     use:[
                //         'css-loader',
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //                 plugins: [
                //                     require('autoprefixer')({
                //                         overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                //                     })
                //                 ]
                //             }
                //         },
                //         'less-loader'
                //     ]
                // }),
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]_[hash:base64:8]',
                }
            },
            {
                test: /\.(png|gif|jpg|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    plugins: [
        // new ExtractTextPlugin('docs/index.md'),


        // 捕获错误手写插件
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },

        new FriendlyErrorsWebpackPlugin(),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[id].[hash:8].css',
        }),

        new VueLoaderPlugin(),
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
            title: 'ssr-client',
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
};


module.exports = config;
