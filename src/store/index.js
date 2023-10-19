import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      role: null,
      token: null,
      screenWidth: null,
    }
  },
  getters: {
    screenType(state) {
      if (state.screenWidth <= 768) {
        return 'small'// phone screen
      }
      else if (state.screenWidth <= 992) {
        return 'medium'// tablet screen
      }
      else {
        return 'large'// computer screen
      }
    }
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true
      state.token = payload.token
      state.role = payload.role
    },
    logout(state) {
      state.isLoggedIn = false
      state.role = null
      state.token = null
    },
    setScreenWidth(state, screenWidth) {
      state.screenWidth = screenWidth
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

export default store