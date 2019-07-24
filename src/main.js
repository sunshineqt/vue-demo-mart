import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = axios;

new Vue({
  // beforeCreate: function () {
  //   console.log(this.$http,'kkk')
  // },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
