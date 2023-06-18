<template>
    <label for="first-name-vertical">{{ label }} <small v-if="required" class="text-danger">*</small></label>
    <input type="text" class="form-control" v-bind="$attrs"
    @input="handleInput($event)" :value="modelValue">
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
  modelValue: [String, Number],
})

const emits = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emits('update:modelValue', target.value);
  }
}
</script>