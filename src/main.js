import '@/assets/index.css';
import 'animate.css/animate.min.css';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import {
  BackTop,
  Spin,
  Tabs,
  TabPane
} from 'iview';
import App from './App';
import { createRouter } from './router';

Vue.config.productionTip = false

Vue.component('Spin', Spin)
Vue.component('BackTop', BackTop)
Vue.component('TabPane', TabPane)
Vue.component('Tabs', Tabs)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/static/Heart.gif',
  error: '/static/error.jpg',
  attempt: 1
})
Vue.prototype.$http = axios

/* eslint-disable no-new */

export function createApp() {
  const router = createRouter()
  
  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}