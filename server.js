const express = require('express');

const server = express();


const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./dist/index.client.html', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
});

server.use(express.static('./dist'));

// 在服务器处理函数中……
server.get('*', (req, res) => {
    const context = { url: req.url, title: 'ssr', meta: `<meta name="viewport" content="width=device-width">` };
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
        // 处理异常……
        console.log(err);
        res.end(html)
    })
});


server.listen(8080, () => {
    console.log('start');
});
