import { createStore } from 'vuex';
const TokenKey = 'mall_token';
export default createStore({
  state: {
    userName: '',
    token: TokenKey,
    navBarShow: true,
    addressInfo: {
      name: '',
      tel: '',
      address: ''
    },
    chooseAddressId: ''
  },
  mutations: {
    getUserName(state,data) {
      state.userName = data
    }
  },
  actions: {},
  modules: {},
})
