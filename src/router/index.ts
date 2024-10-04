import { createRouter, createWebHistory } from 'vue-router'
import EmsPage from '../views/EmsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: '',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/',
      name: '',
      children: [
        {
          path: 'ems',
          name: 'ems',
          component: EmsPage
        },
        {
          path: 'life-care',
          name: 'life-care',
          component: () => import('../views/LifeCare.vue')
        },
        {
          path: 'pral',
          name: 'pral',
          component: () => import('../views/PralPage.vue'),
        },
        {
          path: 'version',
          name: 'version',
          component: () => import('../views/Version.vue'),
        },
      ]
    }
  ]
})

export default router
