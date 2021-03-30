import { createStore } from 'vuex';
const TokenKey = 'mall_token';
// 获取主机地址
// import api from '@/api' : 'http://localhost:3000/'
// import http from 'axios'
export default createStore({
  state: {
    userName: '',
    token: TokenKey,
    // 控制tabBar显示隐藏的
    navBarShow: true,
    addressInfo: {
      name: '',
      tel: '',
      address: ''
    },
    // 用户信息
    userInfo: {},
    chooseAddressId: ''
  },
  mutations: {
    getUserName(state,data) {
      state.userName = data
    }
  },
  actions: {
    // 登录
    login ({commit}, phone) {
      // console.log(phone, 'phone')
      // 首先验证是否有这个手机号
      // let url = api.host + 'users?phone=' + phone
      // return http.get(url)
      //   .then(function (data) {
      //     if (data.data.length > 0) {
      //       // 有数据->提取数据并保存到vuex的userInfo下
      //       commit('SAVE_USER', data.data[0])
      //       // 获取地址信息
      //       let getSiteApi = api.host + 'users/' + data.data[0].id + '/sites'
      //       http.get(getSiteApi)
      //         .then((data) => {
      //           commit('SAVE_SITES', data.data)
      //         })
      //       // 获取购物车数据
      //       let getCartsApi = api.host + 'users/' + data.data[0].id + '/carts'
      //       http.get(getCartsApi)
      //         .then(data => {
      //           // 保存购物车数据到store中
      //           commit('SAVE_CARTS', data.data)
      //         })
      //       // 返回登陆成功
      //       return {status: true, msg: '登陆成功'}
      //     } else {
      //       // 没有数据->注册
      //       let url = api.host + 'users'
      //       // 构造用户对象
      //       let newUser = {
      //         phone: phone,
      //         level: 'V0',
      //         current_score: 0,
      //         dif_score: '距下一等级还需 30 成长值',
      //         selectedSite: {}
      //       }
      //       // 将新创建的对象添加到数据库中
      //       return http.post(url, newUser)
      //         .then(function (data) {
      //           // 注册成功->保存到vuex的userInfo
      //           commit('SAVE_USER', data.data)
      //           return {status: true, msg: '注册成功'}
      //         })
      //     }
      //   })
      //   .catch(function () {
      //     // 如果有错误
      //     return {status: false, msg: '登录失败'}
      //   })
    },
    // 保存地址，并添加到该用户下的地址列表中
    addSite ({commit}, site) {
      // 首先将地址保存到数据库中
      // 拼接添加到地址列表中的路径
      // let addSiteApi = api.host + 'sites'
      // return http.post(addSiteApi, site)
      //   .then((data) => {
      //     if (data.data.id !== undefined) {
      //       site.id = data.data.id
      //       commit('ADD_SITE', site)
      //       return {status: true, msg: '添加地址成功', id: data.data.id}
      //     } else {
      //       return {status: false, msg: '添加地址失败'}
      //     }
      //   })
    },
     // 切换地址列表页中所选的地址
    // changeSelectedSite (store, site) {
    //   // 切换数据库中的用户所选地址
    //   let changeSelectedSiteApi = api.host + 'users/' + store.state.userInfo.id
    //   return http.get(changeSelectedSiteApi)
    //     .then((data) => {
    //       // 判断是不是获取到了数据
    //       if (data.data.id > 0) {
    //         data.data.selectedSite = site
    //         // 更改数据库中的当前用户的SelectedSite值
    //         return http.put(changeSelectedSiteApi, data.data)
    //       }
    //     })
    //     .then((data) => {
    //       // 更新vuex中的userInfo
    //       store.commit('CHANGE_SELECTED_SITE', site)
    //     })
    // },
    // // 更新地址
    // changeSite (store, site) {
    //   let changeSiteApi = api.host + 'sites/' + site.id
    //   return http.put(changeSiteApi, site)
    //     .then(data => {
    //       if (data.data.id > 0) {
    //         store.commit('CHANG_SITES', site)
    //         return {status: true, msg: '更改地址成功'}
    //       }
    //     })
    // },
    // 购物车数量图标动画
    changeCartActive ({commit}) {
      commit('CART_ACTIVE_TRUE')
      setTimeout(() => {
        commit('CART_ACTIVE_FALSE')
      }, 300)
    },
  },
  modules: {},
})
