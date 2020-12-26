import { createRouter, createWebHashHistory } from 'vue-router'
import teacherRoutes from './modules/teacher'
// import store from '../store'
// import { Notify } from 'vant'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import ('../layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive:false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('/@/views/Home/index.vue')
      },
      {
        path: '/my-center',
        name: 'MyCenter',
        component: () => import('/@/views/MyCenter/index.vue')
      },
      {
        path: '/product-list',
        name: 'ProductList',
        component: () => import('/@/views/ProductList/index.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('/@/views/Cart/index.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/Detail/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...teacherRoutes]
})
export default router
