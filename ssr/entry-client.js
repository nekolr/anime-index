import { createApp } from '../src/main'

const { app, router } = createApp()

// 因为可能存在异步组件，所以等待router将所有异步组件加载完毕，服务器端配置也需要此操作
router.onReady(() => {
    // 这里需要 App.vue 模板中根元素具有 id="app"
    app.$mount('#app')
})