<template>
   <div id="sidebar" class="active">
    <Sidebar />
  </div>
  <div id="main">
    <Header/>

    <div class="page-content">
      <section class="row">
        <section class="section">
        
        </section>
      </section>
    </div>
    
    <Footer/>
  </div>
</template>

<script setup lang="ts">
  import Sidebar from '@/components/skelton/Sidebar.vue';
  import '../assets/js/pages/dashboard.js'
  import Header from '@/components/skelton/Header.vue';
  import Footer from '@/components/skelton/Footer.vue';
</script>