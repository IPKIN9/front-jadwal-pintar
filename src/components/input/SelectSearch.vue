<template>
  <label class="from-label">{{ label }} <small v-if="required" class="text-danger">*</small></label>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
    <input type="text" class="form-control" placeholder="---Cari disini---" v-model="searchPayload" @keyup="searchData()" @focus="searchData()">
  </div>
 <TransitionGroup name="selectsearch" tag="select" v-show="list.length >= 1" class="form-select" v-bind="$attrs"  @input="handleInput($event)" :value="modelValue">
    <option v-for="(ls, index) in list" :key="index" :value="ls[showUp.key]" class="text-capitalize">{{ ls[showUp.name] }}</option>
 </TransitionGroup>
</template>
<style>
.selectsearch-enter-active {
  transition: all 0.1s ease;
}

.selectsearch-enter-active{
  transition-delay: 0.1s;
}

.selectsearch-enter-from,
.selectsearch-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.selectsearch {
  overflow: hidden;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Text input'
  },
  list: {
    type   : [Object, Array],
    default: []
  },
  showUp: {
    type: Object,
    default: {
      key : 'id'  ,
      name: 'nama'
    }
  },
  modelValue: [String, Number],
  required: {
    type   : Boolean,
    default: false
  }
})

const emits = defineEmits(['searchEvent', 'update:modelValue', 'clearData'])

const searchPayload = ref('')

const searchData = (): void => {
  emits('searchEvent', searchPayload.value)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emits('update:modelValue', target.value);
  }
}

const delList = (): void => {
  if (!props.modelValue) {
    emits('clearData')
  }
}
</script>