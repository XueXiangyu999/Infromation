// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
import JsonExcel from "vue-json-excel"
import qs from 'qs'
import store from './vuex/store'

Vue.component("downloadExcel", JsonExcel)
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.withCredentials = true
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
