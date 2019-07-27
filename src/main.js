import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import KHeader from './components/Header.vue';
// 导入拦截器
// import interceptor from './http-interceptor';

Vue.config.productionTip = false;

// 全局引入Header组件,第二个参数为配置项，全局引入后再任何地方都可以直接使用，如在Home.vue中使用
Vue.component('k-header',KHeader)

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
