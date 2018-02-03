import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {
  BackTop,
  Spin,
  Tabs,
  TabPane
} from 'iview'
import VueLazyload from 'vue-lazyload'
import 'iview/dist/styles/iview.css'
import '@/assets/index.css'
import 'animate.css/animate.min.css'

Vue.config.productionTip = false
Vue.component('Spin', Spin)
Vue.component('BackTop', BackTop)
Vue.component('TabPane', TabPane)
Vue.component('Tabs', Tabs)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'static/Ellipsis.gif',
  error: 'static/error.jpg',
  attempt: 1
})
Vue.prototype.$http = axios

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
