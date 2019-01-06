const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const nodeExternals = require("webpack-node-externals")
const merge = require("lodash.merge")
const TARGET_NODE = process.env.WEBPACK_TARGET === "node"
const target = TARGET_NODE ? "server" : "client"

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    // 项目部署的基础路径
    baseUrl: '/',

    // 将构建好的文件输出到哪里
    outputDir: 'dist',

    // 是否在保存的时候使用 `eslint-loader` 进行检查
    lintOnSave: true,

    // 调整内部的 webpack 配置
    chainWebpack: config => {

        // 删除 html
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                });
            })

        config.resolve
            .alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve("src"))
    },

    configureWebpack: () => ({
        // 将 entry 指向应用程序的 server/client 文件
        // 需要注意的是，这里使用的不是单引号，而是 ``
        entry: `./ssr/entry-${target}.js`,
        target: TARGET_NODE ? "node" : "web",
        node: TARGET_NODE ? undefined : false,
        output: {
            filename: 'server-bundle.js',
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，
        // 并生成较小的 bundle 文件。
        externals: TARGET_NODE ? nodeExternals({
            // 不要外置化 webpack 需要处理的依赖模块。
            // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
            // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
            whitelist: /\.css$/
        }) : undefined,
        optimization: {
            splitChunks: {
                chunks: "async",
                minSize: 30000,
                minChunks: 2,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        },
        plugins: [
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            // SSR Plugin
            TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
        ]
    }),
    // 是否为生产环境构建生成 source map
    productionSourceMap: false,

    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        extract: true,

        // 是否开启 CSS source map
        sourceMap: false,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`
        loaderOptions: {},

        // 为所有的 CSS 及其预处理文件开启 CSS Modules
        // 这个选项不会影响 `*.vue` 文件
        modules: false
    },

    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启
    parallel: require('os').cpus().length > 1,

    // PWA 插件的选项
    pwa: {},

    // 配置 webpack-dev-server 行为
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // string | Object
    },

    // 三方插件的选项
    pluginOptions: {}
}