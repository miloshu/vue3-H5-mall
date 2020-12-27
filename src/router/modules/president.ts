
import Layout from '/@/layout/index.vue'

const presidentRoutes = [
  {
    path: '/page/pc/s',
    component: Layout,
    name: 'president',
    children: [
      {
        path: 'history',
        component: () => import('/@/views/president/history/index.vue'),
      },
      {
        path: 'statistics',
        component: () => import('/@/views/president/statistics/index.vue'),
      },
      {
        path: 'rank',
        component: () => import('/@/views/president/rank.vue'),
      }
    ]
  },
  
]

export default presidentRoutes
  