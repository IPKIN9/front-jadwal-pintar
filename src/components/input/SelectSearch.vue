<template>
  <label class="from-label">{{ label }} <small v-if="required" class="text-danger">*</small></label>
  <div class="form-group mb-2 position-relative has-icon-right">
    <input v-bind="$attrs" @focusin="getWidth()" id="input-search" type="text" class="form-control"
      placeholder="---Cari disini---" v-model="searchPayload" @keyup="searchData()" @focus="searchData()"
      autocomplete="off">
      <div v-show="list.length >= 1 || searchPayload.length >= 1" class="form-control-icon">
          <a role="button" @click="clearInput()" class="fa-solid fa-xmark text-danger"></a>
      </div>
  </div>
  <TransitionGroup id="select-search" name="selectsearch" tag="select" v-show="list.length >= 1 && showList"
    class="form-select" v-bind="$attrs" @input="handleInput($event)" :value="modelValue">
    <option v-for="(ls, index) in list" :key="index" :value="ls[showUp.key]" class="text-capitalize"
      @click="setNameValue(ls[showUp.name])">{{ ls[showUp.name] }}</option>
  </TransitionGroup>
</template>
<style>
.selectsearch-enter-active {
  transition: all 0.1s ease;
}

.selectsearch-enter-active {
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

#select-search {
  position: absolute;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: {
    type   : String,
    default: 'Text input'
  },
  list: {
    type   : [Object, Array],
    default: []
  },
  showUp: {
    type   : Object,
    default: {
      key    : 'id',
      name   : 'nama'
    }
  },
  modelValue: [String, Number],
  required  : {
    type      : Boolean,
    default   : false
  }
})

const emits = defineEmits(['searchEvent', 'update:modelValue', 'clearData', 'setName'])

const getWidth = async () => {
  let width: any = document.getElementById('input-search')?.offsetWidth
  let selectSearch = document.getElementById('select-search') as HTMLInputElement
  selectSearch.style.width = `${width}px`

  showList.value = true
};

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

const setNameValue = (name: string) => {
  searchPayload.value = name
  emits('setName')
}

const clearInput = () => {
  emits('clearData')
  showList.value = false
  searchPayload.value = ''
}

const showList = ref<boolean>(false)

</script>