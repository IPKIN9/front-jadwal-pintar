<template>
  <div class="sidebar-wrapper active">
    <div class="sidebar-header">
      <div class="d-flex justify-content-between">
        <div class="logo">
          <a href="index.html"><img src="../../assets/images/logo/logo.png" alt="Logo" srcset="" /></a>
        </div>
        <div class="toggler">
          <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
        </div>
      </div>
    </div>
    <div class="sidebar-menu">
      <ul class="menu">
        <li class="sidebar-title">Menu</li>

        <li class="sidebar-item" :class="$route.name === 'home' ? 'active' : ''">
          <router-link href="#" class="sidebar-link" :to="{name: 'home'}">
            <i class="bi bi-grid-fill"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="sidebar-item has-sub" :class="$route.name === 'jurusan' ? 'active' : ''">
          <a href="#" class="sidebar-link">
            <i class="bi bi-stack"></i>
            <span>Data Master</span>
          </a>
          <ul class="submenu" style="display: none">
            <li class="submenu-item">
              <router-link href="#" :to="{name: 'jurusan'}">Jurusan</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
  </div>
</template>

<script setup lang="ts">
</script>
