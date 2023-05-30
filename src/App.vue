<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/skelton/Sidebar.vue';
</script>

<template>
  <div id="sidebar" class="active">
    <Sidebar />
  </div>
  <div id="main">
    <header class="mb-3">
      <a href="#" class="burger-btn d-block d-xl-none">
        <i class="bi bi-justify fs-3"></i>
      </a>
    </header>
    <div class="page-content">
      <section class="row">
        <RouterView />
      </section>
    </div>
  </div>
</template>
