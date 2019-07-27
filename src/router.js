import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue';
import Cart from './views/Cart.vue';
import store from './store';
// 自定义的History
import History from './utils/history.js';

Vue.use(Router)
// History当成插件的形式做一个挂载，则其他地方可以直接引用
// use会导致history.js中的install方法执行，在Vue的实例原型上加了一个$routerHistory，则其他地方可以直接使用
Vue.use(History)

// 实例化前，扩展Router
Router.prototype.goBack = function() {
  // isBack用于记录是后退行为
  this.isBack = true;
  this.back();
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      // 元数据
      meta:{auth:true},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to,'to')
  // console.log(to.meta.auth,'to.meta.auth')
  // console.log(store.state.token,'store.state.token')
  if(to.meta.auth){
    // 需要认证，则检查令牌
    // 已登录
    if(store.state.token){
      // 从store中查看令牌
      next();
    } else {
      console.log('2222')
      next({
        path:'/login',
        query:{redirect:to.path}
      })
    }

  } else {
    next();
  } 
})

// safterEach记录历史记录、
router.afterEach( (to, from) => {
  // 依赖于路由器的isBack标识符进行判断
  if(router.isBack) {
    // 后退
    History.pop();
    router.isBack = false;
    // 添加动画名称
    router.transitionName = 'route-back';
  } else {
    // 要去的地址记录下来
    History.push(to.path);
    router.transitionName = 'route-forward';
  }
})



export default router