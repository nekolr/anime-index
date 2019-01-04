import Anime from '@/components/Anime';
import Main from '@/components/Main';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export function createRouter() {
  const router = new Router({
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
      },
      {
        path: '*',
        redirect: '/'
      }
    ],
    scrollBehavior(to, from, savedPosition) {
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

  return router
}
