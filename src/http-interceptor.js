// http请求拦截器，可统一添加请求头
// 拦截axios所有http请求，预先放入token请求头

import axios from 'axios';
import store from './store';
import router from './router';

// 请求拦截器，方便加请求头
axios.interceptors.request.use(
    // request中的config
    config => {
        // 若存在令牌，则放入请求头
        if(store.state.token){
            config.headers.token = store.state.token;
        }
        return config;
    }
)
// 响应拦截器，提前预处理响应结果，做一些公共处理
axios.interceptors.response.use(
    // response中的response
    response => {
        // 如果code是-1，说明用户已注销或者token已过期
        // 此时需要重新登录，并且还要清除本地缓存信息
        if(response.status == 200) {
            const data = response.data;
            if(data.code == -1){
                clearHandler();
            }
        }
        return response;
    }, err => {
        // 错误回调
        if(err.response.status === 401) {
            // 未授权
            clearHandler();
        }
    }
)

function clearHandler(){
    // 清空缓存
    store.commit('setToken', '');
    localStorage.removeItem('token');
    // 跳转至登录页,有当前路由则重定向
    // router.push('/login');
    router.push({path:'/login', query:{redirect: router.currentRoute.path}});
}