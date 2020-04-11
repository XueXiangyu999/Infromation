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
import 'babel-polyfill'

Vue.component("downloadExcel", JsonExcel)
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.withCredentials = true
Vue.prototype.$http = axios
//可以在这里同意带上token请求头，下一版再添加吧

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config
//   }, function (error) {
//   // Do something with request error
//   Message.error({
//   message: '请求错误：' + error.message
//   })
//   return Promise.reject(error)
//   })

axios.interceptors.response.use(function (response) {
  console.log('response')
  console.log(response)
  //返回参数是noLogin时，返回首页
  if (response.data.code == '400') {

    this.$message('当前会话过期,请重新登陆')
    this.$router.push('/login')
  }
  return response
},
  function (error) {
    // Do something with response error
    // let msg = error.message
    // if (error.response.status === 401) {
    //   msg = '当前会话已过期。'
    //   Router.push('/login')
    // }
    // Message.error({
    //   message: '响应错误：' + msg
    // })
    // return Promise.reject(error)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
