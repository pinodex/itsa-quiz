const LOGIN = 'LOGIN',
      LOGOUT = 'LOGOUT'

const state = {
  user: null
}

const mutations = {
  [LOGIN] (state, user) {
    state.user = user
  },

  [LOGOUT] (state) {
    state.user = null
  }
}

const actions = {
  login({ commit }, user) {
    commit(LOGIN, user)
  },

  logout({ commit }) {
    commit(LOGOUT)
  }
}

const getters = {
  user: state => {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
