const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//在webpack4.x版本中mini-css-extract-plugin插件代替extract-text-webpack-plugin插件

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@service': path.resolve(__dirname, '../src/services')
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
                loader: 'vue-loader'
            },
            {
                test: /\.(png|gif|jpe?g|JPE?G|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            esModule: false,
                            limit: 10240,
                            name: 'images/[name].[ext]'
                        },
                    }
                ],

            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].client.css",
            chunkFilename: "css/[id].client.css"
        })
    ]
};
