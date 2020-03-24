const MFS = require('memory-fs');
const path = require('path');
const webpack = require('webpack');
const clientConfig = require('./webpack.client.conf');
const serverConfig = require('./webpack.server.conf');
const serverMiddleware = require('webpack-dev-middleware');

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {
    }
};

module.exports = function setDevServer(app) {
    return new Promise((resolve, reject) => {
        let bundle,
            clientManifest;

        // 把热更新的代码放入到入口文件
        clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
        clientConfig.output.filename = '[name].dev.js';
        clientConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );

        const clientCompiler = webpack(clientConfig);
        const devMiddleware = serverMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            noInfo: true
        });

        app.use(devMiddleware);

        clientCompiler.plugin('done', stats => {
            const fs = devMiddleware.fileSystem;
            stats = stats.toJson();
            stats.errors.forEach(err => console.error(err));
            stats.warnings.forEach(err => console.warn(err));
            if (stats.errors.length) return;

            clientManifest = JSON.parse(readFile(
                fs,
                'vue-ssr-client-manifest.json'
            ));

            if (bundle) {
                resolve({
                    bundle,
                    clientManifest
                })
            }
        });

        app.use(require('webpack-hot-middleware')(clientCompiler, {heartbeat: 5000}));

        // watch and update server renderer;
        const serverCompiler = webpack(serverConfig);
        const mfs = new MFS();
        serverCompiler.outputFileSystem = mfs;
        serverCompiler.watch({}, (err, stats) => {
            if (err) throw err;
            stats = stats.toJson();
            if (stats.errors.length) return;

            bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));

            if (clientManifest) {
                resolve({
                    bundle,
                    clientManifest
                })
            }
        });

    })
};
