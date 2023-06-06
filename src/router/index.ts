import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Jurusan from '../views/Jurusan.vue'
import Pangkat from '../views/Pangkat.vue'
import Mapel from '../views/Mapel.vue'
import Kelas from '../views/Kelas.vue'
import Guru from '@/views/Guru.vue'

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
    {
      path: '/mapel',
      name: 'mapel',
      component: Mapel
    },
    {
      path: '/kelas',
      name: 'kelas',
      component: Kelas
    },
    {
      path: '/guru',
      name: 'guru',
      component: Guru
    },
  ]
})

export default router
