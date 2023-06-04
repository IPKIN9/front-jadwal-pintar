<template>
  <button type="button" class="btn" v-bind="$attrs" @click="eventTriger()">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonType: {
    type   : String,
    default: "button",
  },
  dataId: Number,
  rowData: Object
});

const emits: any = defineEmits(['eventClick'])
const eventTriger = () => {
  emits('eventClick', {dataId: props.dataId, buttonType: props.buttonType, rowData: props.rowData})
}
</script>
