import '@/assets/index.css';
import 'animate.css/animate.min.css';
import axios from 'axios';
import { BackTop, Spin, TabPane, Tabs } from 'iview';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';

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

const app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

export function createApp() {
  return { app, router }
}