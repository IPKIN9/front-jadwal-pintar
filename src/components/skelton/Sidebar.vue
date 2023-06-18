<template>
  <div class="sidebar-wrapper active">
    <div class="sidebar-header">
      <div class="d-flex justify-content-center">
        <div class="logo text-center">
          <a href="#"><img src="../../assets/images/logo/logosmkn2palu.png" alt="Logo" style="height: 70px;" /> <p style="margin-top: 12px; font-size: 21pt; font-weight: 800;">SMKN 2 PALU</p></a>
        </div>
        <div class="toggler">
          <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
        </div>
      </div>
    </div>
    <div class="sidebar-menu">
      <ul class="menu">
        <li class="sidebar-title">Menu</li>

        <li class="sidebar-item" :class="$route.name === 'jadwal' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'jadwal'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Jadwal</span>
          </router-link>
        </li>

        <!-- <li class="sidebar-item has-sub" :class="$route.name === 'jurusan' || $route.name === 'pangkat' || $route.name === 'mapel' || $route.name === 'kelas' || $route.name === 'guru' ? 'active' : ''">
          <a href="#" class="sidebar-link">
            <i class="bi bi-stack"></i>
            <span>Data Master</span>
          </a>
          <ul id="sub-bar" class="submenu" :class="$route.name === 'jurusan' || $route.name === 'pangkat' || $route.name === 'mapel' || $route.name === 'kelas' || $route.name === 'guru' ? 'active' : ''">
            <li class="submenu-item" :class="$route.name === 'pangkat' ? 'active' : ''">
              <router-link href="#" :to="{name: 'pangkat'}">Pangkat Guru</router-link>
            </li>
            <li class="submenu-item" :class="$route.name === 'jurusan' ? 'active' : ''">
              <router-link href="#" :to="{name: 'jurusan'}">Jurusan</router-link>
            </li>
            <li class="submenu-item" :class="$route.name === 'mapel' ? 'active' : ''">
              <router-link href="#" :to="{name: 'mapel'}">Mata Pelajaran</router-link>
            </li>
            <li class="submenu-item" :class="$route.name === 'kelas' ? 'active' : ''">
              <router-link href="#" :to="{name: 'kelas'}">Kelas</router-link>
            </li>
            <li class="submenu-item" :class="$route.name === 'guru' ? 'active' : ''">
              <router-link href="#" :to="{name: 'guru'}">Guru</router-link>
            </li>
          </ul>
        </li> -->
        <li class="sidebar-item" :class="$route.name === 'pangkat' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'pangkat'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Pangkat</span>
          </router-link>
        </li>
        <li class="sidebar-item" :class="$route.name === 'jurusan' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'jurusan'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Jurusan</span>
          </router-link>
        </li>
        <li class="sidebar-item" :class="$route.name === 'mapel' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'mapel'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Mata Pelajaran</span>
          </router-link>
        </li>
        <li class="sidebar-item" :class="$route.name === 'kelas' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'kelas'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Kelas</span>
          </router-link>
        </li>
        <li class="sidebar-item" :class="$route.name === 'guru' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'guru'}">
            <i class="bi bi-grid-1x2-fill"></i>
            <span>Guru</span>
          </router-link>
        </li>
        <li class="sidebar-item" :class="$route.name === 'export' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'export'}">
            <i class="fa-solid fa-download"></i>
            <span>Export</span>
          </router-link>
        </li>
      </ul>
      <div class="d-flex justify-content-center" style="position: absolute; bottom: 5%; left: 20%;">
        <BaseButton @event-click="logout()" class="btn-danger rounded px-5"><i class="fa-solid fa-power-off"></i> Logout</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '../button/BaseButton.vue';
import SweetAlert from '@/utils/other/SweetAlert';

const  router = useRouter()
const deleteToken = () => {
  localStorage.clear()
  router.replace('/login')
}

const logout = () => {
  SweetAlert.confirmLogout(deleteToken)
}
</script>
