import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModal: false,
    isLoading:false
  },
  getters: {
    getIsLoading(state) { return state.isLoading; }
  },
  mutations: {
    isModalTrue(state){
      state.isModal = true
    },
    isModalFalse(state){
      state.isModal = false
    },
    Loading(state,payload){
      state.isLoading=payload
    }
  },
  actions: {
    changeIsModalTrue(context){
      context.commit('isModalTrue')
    },
    changeIsModalFalse(context){
      context.commit('isModalFalse')
    },
    LoadingAction(context,payload){
      context.commit('Loading',payload)
    }
  },
  modules: {
  }
})
