const state = {
  auth: {
    loginState: false,
    type: null,
    token: null
  }
}

const getters = {

}

const actions = {
  setAuthCustomer ({ state, dispatch, commit }, data) {
    commit('SET_AUTH_CUSTOMER')
    commit('SET_AUTH_TOKEN', data.token)
  },
  setAuthEmployee ({ state, dispatch, commit }, data) {
    commit('SET_AUTH_EMPLOYEE')
    commit('SET_AUTH_TOKEN', data.token)
  },
  logout ({state, dispatch, commit}, data) {
    commit('SET_AUTH_LOGOUT')
  }
}

const mutations = {
  SET_AUTH_CUSTOMER (state) {
    state.auth.loginState = true
    state.auth.type = 'customer'
  },
  SET_AUTH_EMPLOYEE (state) {
    state.auth.loginState = true
    state.auth.type = 'employee'
  },
  SET_AUTH_LOGOUT (state) {
    state.auth.loginState = false
    state.auth.type = null
  },
  SET_AUTH_TOKEN (state, token) {
    state.auth.token = token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
