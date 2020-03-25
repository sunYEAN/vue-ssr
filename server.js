const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const { createProxyMiddleware } = require("http-proxy-middleware");
const { createBundleRenderer } = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const template = fs.readFileSync('./public/index.html', 'utf-8');

const resolve = (_p) => path.resolve(__dirname, _p);

function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, {
        template: options.template,
        clientManifest: options.clientManifest,
        // cache: new LRU({
        //     max: 1000,
        //     maxAge: 1000 * 60 * 15
        // }),
        basedir: resolve('./dist'),
        runInNewContext: false
    })
}

let renderer;
if (isProd) { // 生产环境
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = Promise.resolve(
        createRenderer(serverBundle, {
            template,
            clientManifest
        })
    );
} else { // 开发环境
    renderer = require('./build/dev-server')(server).then(({bundle, clientManifest}) => {
        return createRenderer(bundle, {
            template,
            clientManifest
        });
    });
}

server.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}));

server.use(express.static('./dist'));

// 在服务器处理函数中……
server.get('*', (req, res) => {
    const context = {
        url: req.url,
        title: 'ssr'
    };

    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.then(render => {
        render.renderToString(context, (err, html) => {
          // 处理异常……
          if (err) {
              res.end(JSON.stringify(err));
          } else res.end(html)
      })
    })
});


server.listen(8080, () => {
    console.log('start');
});
