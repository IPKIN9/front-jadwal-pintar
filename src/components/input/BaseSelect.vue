<template>
  <label class="from-label">{{ label }} <small v-if="required" class="text-danger">*</small></label>
  <select class="form-select" aria-label="Default select example" v-bind="$attrs"  @input="handleInput($event)" :value="modelValue">
    <option selected value="0">Open this select menu</option>
    <option class="text-capitalize" v-for="(ls, index) in list" :key="index" :value="ls.val">{{ ls.lable }}</option>
  </select>
</template>
<script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      default: 'Text input'
    },
    list: {
      type   : [Object, Array],
      default: []
    },
    modelValue: [String, Number],
    required: {
      type   : Boolean,
      default: false
    }
  })

  const emits = defineEmits(['update:modelValue'])

  const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
    if (target) {
      emits('update:modelValue', target.value);
    }
  }
</script>