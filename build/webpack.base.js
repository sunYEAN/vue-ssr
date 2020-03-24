const path = require('path');

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/entry-client/index.js',
        vendor: [
            'es6-promise/auto',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@service': path.resolve(__dirname, '../src/services'),
            'public': path.resolve(__dirname, '../public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
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
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    }
}
