<template>
  <img class="img-loading" :src="loadingImg" alt="">
</template>
<style scoped>
.img-loading{
  height: 20px;
  widows: auto;
}
</style>
<script setup lang="ts">
import loadingImg from '../../assets/images/Loading.gif'
</script>