import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 令牌
    token:localStorage.getItem('token') || '',
    cart:JSON.parse(localStorage.getItem('cart')) || []
  },
  getters:{
    // getters只读
    isLogin:state => {
      // 转换为布尔值
      return !!state.token;
    } 
  },
  mutations: {
    // 修改令牌
    setToken(state, token) {
      state.token = token;
    },
    addCart(state, item) {
      const good = state.cart.find(v => v.id == item.id);
      if(good){
        good.cartCount += 1;
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        })
      }
    }
  },
  actions: {

  }
})

// 订阅store变化，订阅的方法是回调函数
store.subscribe((mutation, state) => {
// 发生改变的mutation所组成的对象
  switch(mutation.type) {
    case 'setToken':
      localStorage.setItem('token', JSON.stringify(state.token));
      break;
    case 'addCart':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;  
  }

})

export default store
