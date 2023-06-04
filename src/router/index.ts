import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Jurusan from '../views/Jurusan.vue'
import Pangkat from '../views/Pangkat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jurusan',
      name: 'jurusan',
      component: Jurusan
    },
    {
      path: '/pangkat',
      name: 'pangkat',
      component: Pangkat
    },
  ]
})

export default router
