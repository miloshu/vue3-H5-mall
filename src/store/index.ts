import { createStore } from 'vuex';

export default createStore({
  state: {
    userName: '',
    token: '',
    navBarShow: true,
  },
  mutations: {
    getUserNmae(state,data) {
      state.userName = data
    }
  },
  actions: {},
  modules: {},
})
