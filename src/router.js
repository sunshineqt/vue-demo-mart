import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue';
import store from './store';

Vue.use(Router)
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
  console.log(to,'to')
  console.log(to.meta.auth,'to.meta.auth')
  console.log(store.state.token,'store.state.token')
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
export default router