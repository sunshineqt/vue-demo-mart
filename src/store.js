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
    },
    // 计算购物车中项目总个数
    cartTotal:state => {
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
     // 购物车总和,num起始值为0
    //  total: state =>  state.cart.reduce((num, v) => num += v.cartCount * v.price, 0)
     total: state => {
       return state.cart.reduce((num, v) => num += v.cartCount * v.price, 0)
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
    },
    // 购物车单项商品减操作
    countMinus(state, index) {
      //找到当前的购物车项
      const item = state.cart[index];
      if(item.cartCount > 1) {
        item.cartCount -= 1;
      } else {
        state.cart.splice(index, 1)
      }
    },
    // 购物车单项商品加操作
    countAdd(state, index) {
      state.cart[index].cartCount += 1;
    },
   
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
