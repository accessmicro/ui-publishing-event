import { createRouter, createWebHistory } from 'vue-router'
import Esm from '../views/EsmPage.vue'

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
          path: 'esm',
          name: 'esm',
          component: Esm
        },
        {
          path: 'life-care',
          name: 'life-care',
          component: () => import('../views/LifeCare.vue')
        }
      ]
    }
  ]
})

export default router
