import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    initializeApp: function() {
      console.log('se cargó initializeapp')
    },
    logout: function (state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
  },
  modules: {
  }
})
