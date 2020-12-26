import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 全局引入vant样式
import 'vant/lib/index.css'
// 引入全局样式
import '/@/style/index.scss'
// 屏幕适配方案
import './assets/fontSize/index'
// 全局引入按需引入UI库 vant
import { vantUI } from './plugin/vant'

// 全局钩子函数--监听全局路由变化
router.beforeEach((to, from, next) => {
  // do something
  // 判断navBar是显示还是隐藏
  if (to.path === '/' || to.path === '/product-list' || to.path === '/cart' || to.path === '/my-center') {
    store.state.navBarShow = true
  } else {
    store.state.navBarShow = false
  }
  next()
})
// router.beforeEach((to, from, next) => {
//   // 获取角色
//   if (store.state.role) {
//     next()
//   } else {
//     if (!sessionStorage.getItem("role") && to.fullPath !== '/') {
//       Notify({ type: 'danger', message: '登陆超时，请重新登陆' })
//     } else {
//       const user = {
//         username: sessionStorage.getItem("username"),
//         school: sessionStorage.getItem("school"),
//         role: sessionStorage.getItem("role"),
//         schoolId: sessionStorage.getItem("schoolId"),
//       }
//       // store.commit('setMsg', user)
//       // 获取周次
//       const currentWeek = sessionStorage.getItem("currentWeek")
//       if (currentWeek) {
//         store.commit('setCurrentWeek', currentWeek)
//       }
//       next()
//     }
//   }
// })
createApp(App).use(router).use(store).use(vantUI).mount('#app')
