import { createRouter, createWebHashHistory } from 'vue-router'
import addressRoutes from './modules/address'
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
        path: '/goods-list',
        name: 'GoodsList',
        component: () => import('/@/views/ProductList/goodsList.vue')
      },
      {
        path: '/goods-list-detail',
        name: 'GoodsDetail',
        component: () => import('/@/views/ProductList/goodsDetail.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('/@/views/Cart/index.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('/@/views/Detail/index.vue')
      },
      {
        path: '/payment-order',
        name: 'Payment',
        component: () => import('/@/views/Payment/index.vue')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('/@/views/Search/index.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('/@/views/Login/index.vue')
      },
      ...addressRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes]
})
export default router
