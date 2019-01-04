import * as dotenv from 'dotenv';
import fs from 'fs';
import Koa from 'koa';
import favicon from 'koa-favicon';
import koaStatic from 'koa-static';
import path from 'path';
import { createBundleRenderer } from 'vue-server-renderer';

const app = new Koa()
const resolve = file => path.resolve(__dirname, file)

const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// 环境配置
let envFilePath = '.env'
dotenv.config({ envFilePath, silent: true })
let port = process.env.PORT

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve("./src/template/index.html"), "utf-8"),
    clientManifest: clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html)
        })
    })
}

// 开放 dist 目录
app.use(koaStatic(path.resolve('dist')), {
    hidden: 'index.html'
})

// 添加一个中间件来处理所有请求
app.use(async (ctx, next) => {
    let start = Date.now()
    const context = {
        url: ctx.url
    }
    // 将 context 数据渲染为 HTML
    const html = await renderToString(context)
    console.log('%s %s - %s', ctx.method, ctx.url, Date.now() - start)
    ctx.body = html
});

app.use(favicon(path.resolve(__dirname, 'public/static/anime.png')))

app.on('error', function (err, ctx) {
    console.log('server error', err)
})

export default app.listen(port, () => {
    console.log(`Koa is listening in ${port}`)
})