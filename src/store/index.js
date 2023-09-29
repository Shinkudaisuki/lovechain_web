import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
        isLoggedIn: false,
    }
  },
  getters: {
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
  },
  actions: {
  },
  modules: {
  }
})
