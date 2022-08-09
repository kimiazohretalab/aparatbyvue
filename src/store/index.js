import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModal: false
  },
  getters: {
  },
  mutations: {
    isModalTrue(state){
      state.isModal = true
    },
    isModalFalse(state){
      state.isModal = false
    }
  },
  actions: {
    changeIsModalTrue(context){
      context.commit('isModalTrue')
    },
    changeIsModalFalse(context){
      context.commit('isModalFalse')
    }
  },
  modules: {
  }
})
