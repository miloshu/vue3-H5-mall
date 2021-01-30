const addressRoutes = [
  {
    path: '/address-list',
    name: 'AddressList',
    component: () => import('/@/views/AddressList/index.vue'),
    
  },
  {
    path: '/address-list/edit',
    name: 'AddressEdit',
    component: () => import('/@/views/AddressList/edit.vue')
  }
]

export default addressRoutes
