import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '@/views/PageNotFound.vue'
import HomeView from '../views/HomeView.vue'
import Jurusan from '../views/Jurusan.vue'
import Pangkat from '../views/Pangkat.vue'
import Export from '@/views/Export.vue'
import Jadwal from '@/views/Jadwal.vue'
import Mapel from '../views/Mapel.vue'
import Kelas from '../views/Kelas.vue'
import Login from '@/views/Login.vue'
import Guru from '@/views/Guru.vue'
import { ref } from 'vue'
import AuthConfig from '@/utils/other/AuthConfig'

const envApp = import.meta.env.VITE_APP_ENV

const deviceGuard = (to: any, from: any, next: any) => {
  const isMobile = ref(false)

  const checkDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    isMobile.value = /mobile|android|iphone|ipad|iemobile|wpdesktop/i.test(userAgent)
  }

  const checkChrome = () => {
    const isChrome = /chrome/i.test(navigator.userAgent)
    const isDesktop = !isMobile.value

    return isChrome && isDesktop
  }

  checkDevice()
  const isDesktopChrome = checkChrome()

  if (isDesktopChrome) {
    next()
  } else {
    next('/404')
  }
}

const tokenGuard = (to: any, from: any, next: any) => {
  if (AuthConfig.envTransform(envApp) !== 'local' && AuthConfig.checkToken()) {
    next()
  } else {
    localStorage.removeItem('user')
    localStorage.removeItem('scope')
    next('/login')
  }
}

const loginGuard = (to: any, from: any, next: any) => {
  if (AuthConfig.checkToken()) {
    next('/')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'jadwal',
      component: Jadwal,
      beforeEnter: tokenGuard
    },
    {
      path: '/jurusan',
      name: 'jurusan',
      component: Jurusan,
      beforeEnter: tokenGuard
    },
    {
      path: '/pangkat',
      name: 'pangkat',
      component: Pangkat,
      beforeEnter: tokenGuard
    },
    {
      path: '/mapel',
      name: 'mapel',
      component: Mapel,
      beforeEnter: tokenGuard
    },
    {
      path: '/kelas',
      name: 'kelas',
      component: Kelas,
      beforeEnter: tokenGuard
    },
    {
      path: '/guru',
      name: 'guru',
      component: Guru,
      beforeEnter: tokenGuard
    },
    {
      path: '/export',
      name: 'export',
      component: Export,
      beforeEnter: tokenGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: [deviceGuard, loginGuard]
    },
    {
      path: "/:catchAll(.*)",
      component: PageNotFound,
    }
  ]
})

export default router
