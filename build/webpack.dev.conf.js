const path = require('path');
const webpack = require('webpack');
const AutoPrefixer = require('autoprefixer');
// const VueClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //@next版本
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, '../src/entry-client/index.js')
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/',
        filename: "[name].js",
    },
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        }
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@service': path.resolve(__dirname, '../src/services')
        }
    },
    stats: "minimal",
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 允许热模块重新加载
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                }),
                                require('postcss-px2rem')({
                                    remUnit: 100
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
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
                test: /\.(png|gif|jpe?g|JPE?G|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: 'images/[name].[hash:8].[ext]',
                            limit: 10240,
                            esModule: false,
                        },
                    }
                ],

            },
        ]
    },

    plugins: [
        // new ExtractTextPlugin('css/[name].css'),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
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
        }),

        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            minChunks: 2,
            cacheGroups: {
                // styles: {
                //     name: 'styles',
                //     test: /\.(c|le)ss$/,
                //     chunks: "all",
                //     enforce: true
                // },
                vendors: {
                    test: /(vue|vuex|vue-router|axios|mockjs)/,
                    name: 'dll'
                }
            }
        }
    }
};



module.exports = config;
