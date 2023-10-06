import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
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
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
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