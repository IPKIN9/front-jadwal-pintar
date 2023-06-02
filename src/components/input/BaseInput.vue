<template>
    <label for="first-name-vertical">{{ label }} <small v-if="required" class="text-danger">*</small></label>
    <input type="text" class="form-control" :class="$attrs">
</template>
<script setup lang="ts">

const props = defineProps({
  label: {
    type: String,
    default: 'label input'
  },
  required: {
    type: Boolean,
    default: false
  },
})
</script>