import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import customer from './modules/customer'
import employee from './modules/employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    customer,
    auth,
    employee
  },
  plugins: [createPersistedState({
    paths: ['customer', 'auth', 'employee']
  })],
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
