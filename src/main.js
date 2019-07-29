import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import KHeader from './components/Header.vue';
// cube-ui  create-api 模块，该模块默认暴露出一个 createAPI 函数，可以实现以 API 的形式调用自定义组件。
// 并且既可以在 Vue 实例上下文中调用，也可以在普通 js 文件中调用。

import {createAPI} from 'cube-ui';
import Notice from './components/Notice.vue';
import notice from './services/notice';
import BallaAnim from './components/BallAnim.vue';
// 导入拦截器
// import interceptor from './http-interceptor';

Vue.config.productionTip = false;

// 全局引入Header组件,第二个参数为配置项，全局引入后再任何地方都可以直接使用，如在Home.vue中使用
Vue.component('k-header',KHeader)

// 挂载全局
Vue.prototype.$http = axios;

Vue.prototype.$notice = notice;

// 创建$createNotice api
// 单例的，全局只加一个，参数3表示单例模式
createAPI(Vue, Notice, true);

createAPI(Vue, BallaAnim, ['transitionend']);

new Vue({
  // 测试vue原型上是否挂载成功相应插件
  // beforeCreate: function () {
  //   console.log(this.$http,'kkk')
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
