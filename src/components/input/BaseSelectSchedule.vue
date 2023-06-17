<template>
  <label class="from-label">{{ label }} <small v-if="required" class="text-danger">*</small></label>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
    <input type="text" class="form-control" placeholder="---Cari disini---" v-model="searchPayload" @keyup="searchData()" @focus="searchData()">
  </div>
 <TransitionGroup name="selectsearch" tag="select" v-show="list.length >= 1" class="form-select" v-bind="$attrs"  @input="handleInput($event)" :value="modelValue">
    <option v-for="(ls, index) in list" :key="index" :value="ls[showUp.key]" :class="checkDataExists(ls[showUp.key], formatDate(tgl)) ? 'hidden' : ''" class="text-capitalize">{{ ls[showUp.name] }}</option>
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
.hidden {
  display: none;
}
</style>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: 'Text input'
  },
  list: {
    type   : [Object, Array],
    default: []
  },
  listSchedule: {
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
  tgl: {
    type: String,
    default: ''
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

const checkDataExists = (id: number, tgl: string):boolean => {
  // return props.listSchedule.some((item: { guru_id: number }) => item.guru_id === id);
  const filteredData = props.listSchedule.filter((item: { guru_id: number; tgl: string }) => item.guru_id === id && item.tgl === tgl);
  return filteredData.length === 2;
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}

const delList = (): void => {
  if (!props.modelValue) {
    emits('clearData')
  }
}
</script>