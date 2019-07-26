import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
// 导入拦截器
import interceptor from './http-interceptor';

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = axios;

new Vue({
  // 测试vue原型上是否挂载成功相应插件
  // beforeCreate: function () {
  //   console.log(this.$http,'kkk')
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
