import { createStore } from 'vuex';
const TokenKey = 'mall_token';
export default createStore({
  state: {
    userName: '',
    token: TokenKey,
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
