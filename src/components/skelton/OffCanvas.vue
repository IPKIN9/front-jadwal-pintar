<template>
  <div class="offcanvas offcanvas-end" v-bind="$attrs">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ lable }}</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  lable: {
    type: String,
    default: 'Lable'
  }
})
</script>