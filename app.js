import fs from 'fs';
import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import favicon from 'koa-favicon';
import json from 'koa-json';
import logger from 'koa-logger';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import path from 'path';
import { createBundleRenderer } from 'vue-server-renderer';
import './env';
import api from './server/routes/anime.js';

const app = new Koa()
const router = koaRouter()
const resolve = file => path.resolve(__dirname, file)
// 判断当前环境
const isProduction = process.env.NODE_ENV === 'production'

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        runInNewContext: false
    }))
}

let renderer
// ssr 模板文件
const templatePath = resolve('./template/index.html')

let port = process.env.PORT

if (isProduction) {
    const template = fs.readFileSync(templatePath, 'utf-8')
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })

    app.use(serve(path.resolve('dist'), {
        hidden: 'index.html'
    }))
} else {
    require('./build/setup-dev-server')(app, (bundle, template) => {
        renderer = createRenderer(bundle, { template })
    })
}

app.use(koaBodyparser())
app.use(json())
app.use(logger())
app.use(favicon(path.resolve(__dirname, 'public/static/anime.png')))

app.use(async function (ctx, next) {
    let start = new Date()
    await next()
    let ms = new Date() - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
    console.log('server error', err)
})

// 所有 /api 开头的请求都走 api 路由表
router.use('/api', api.routes())

router.get('*', async (ctx, next) => {
    return render(ctx, next)
})

const render = async (ctx, next) => {
    if (!renderer) {
        ctx.body = 'waiting for compilation... refresh in a moment.'
        return ctx.body
    } else {
        let req = ctx.req
        ctx.type = 'html'
        const s = Date.now()
        let context = { url: req.url }
        ctx.body = await renderToStringPromise(context, s)
        return ctx.body
    }
}

function renderToStringPromise(context, s) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                console.log(err)
            }
            if (!isProd) {
                console.log(`whole request: ${Date.now() - s}ms`)
            }
            resolve(html)
        })
    })
}

// 将路由规则挂载到 Koa 上
app.use(router.routes())
app.use(router.allowedMethods())

export default app.listen(port, () => {
    console.log(`Koa is listening in ${port}`)
})