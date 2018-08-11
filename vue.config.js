const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

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
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                return options
            })

        config.resolve
            .alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve("src"))
    },

    configureWebpack:  {
        plugins: [
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },

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