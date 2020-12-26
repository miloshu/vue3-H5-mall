
import Layout from '/@/layout/index.vue'

const presidentRoutes = [
  {
    path: '/page/pc/s',
    component: Layout,
    redirect: '/page/pc/s/teacherScore',
    name: 'president',
    children: [
      {
        path: 'teacherScore',
        component: () => import('/@/views/president/teacherScore.vue'),
      },
      {
        path: 'familyScore',
        component: () => import('/@/views/president/familyScore.vue'),
      },
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
      },
      {
        path: 'data',
        component: () => import('/@/views/president/data/index.vue'),
      },
    ]
  },
  
]

export default presidentRoutes
  