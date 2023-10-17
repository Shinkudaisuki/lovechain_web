import { createStore } from 'vuex'

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
    login(state, role, token) {
      state.isLoggedIn = true
      state.role = role
      state.token = token
    },
    logout(state) {
      state.isLoggedIn = false
      state.role = null
    },
    setScreenWidth(state, screenWidth) {
      state.screenWidth = screenWidth
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store