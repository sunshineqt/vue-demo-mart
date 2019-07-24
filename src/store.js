import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 令牌
    token:localStorage.getItem('token') || ''
  },
  mutations: {
    // 修改令牌
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {

  }
})
