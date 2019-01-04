import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Anime from '@/components/Anime'

Vue.use(Router)

export default new Router({
  // 去 # 号，需服务端支持
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      components: {
        main: Main
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/anime/:id',
      name: 'Anime',
      components: {
        main: Anime
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
