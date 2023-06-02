<template>
  <section class="section">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h3>TABEL JURUSAN</h3>
          <BaseButton class="btn-primary" @event-click="showHideModal">Tambah Data</BaseButton>
        </div>
      </div>
      <div class="card-body">
        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
          <div class="dataTable-top d-flex justify-content-between">
            <div class="dataTable-dropdown">
              <select class="dataTable-selector form-select" v-model.number="meta.limit" @change="getPayloadList()">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select><label>entries per page</label></div>
            <div class="dataTable-search">
             <div class="input-group">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
              <input class="dataTable-input" placeholder="Search..." type="text" v-model="meta.search" @keyup="getPayloadList()">
             </div>
            </div>
          </div>
          <div class="dataTable-container">
            <table class="table" id="table1">
              <thead>
                <tr>
                  <th style="width: 5%;"><a href="#">No.</a></th>
                  <th style="width: 41.862%;"><a @click="sortingData(meta.sort, '_jurusan')" href="#" class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon._jurusan"></i> Nama</a></th>
                  <th style="width: 18.8881%;"><a @click="sortingData(meta.sort, 'created_at')" href="#" class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon.created_at"></i> Dibuat</a></th>
                  <th style="width: 16.3429%;"><a href="#" class="dataTable-sorter">Diupdate</a></th>
                  <th style="width: 11.1186%;"><a href="#" class="dataTable-sorter">Aksi</a></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jurusan, index) in payloadList" :key="index">
                  <td>{{ index + 1 }}.</td>
                  <td class="text-capitalize">{{ jurusan._jurusan }}</td>
                  <td>{{ moment(jurusan.created_at).format('DD, MMMM YYYY') }}</td>
                  <td>{{ moment(jurusan.updated_at).format('DD, MMMM YYYY') }}</td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                        <BaseButton class="btn"><i class="text-primary fas fa-pencil mx-2"></i></BaseButton>
                        <BaseButton class="btn"><i class="text-danger fas fa-trash mx-2"></i></BaseButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paggination :page="meta.page" :total="meta.total" :limit="meta.limit" @event-click="paggination" />
        </div>
      </div>
    </div>
  </section>
  <ModalComponent id="myModal" title="Formulir Data"></ModalComponent>

</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import jurusan from '@/utils/api/jurusan'
import moment from 'moment'
import BaseButton from '@/components/button/BaseButton.vue'
import Paggination from '../components/skelton/Paggination.vue'
import ModalComponent from '../components/modal/FormModal.vue'


/* Fungsi untuk mengambil data jurusan */
const payloadList = ref()

interface SortIcon {
  _jurusan  : string,
  created_at: string
}

interface Meta {
  sortIcon: SortIcon,
  search  : string;
  limit   : number;
  page    : number;
  total   : number;
  orderBy : string;
  sort    : string;
}

const meta: Meta = reactive({
  sortIcon : {
    _jurusan  : 'fa-sort',
    created_at: 'fa-sort-up'
  },
  search   : "",
  limit    : 10,
  page     : 1,
  total    : 0,
  orderBy  : "created_at",
  sort     : "desc"
})

const getPayloadList = (): void => {
  jurusan.getAll(meta)
    .then((res: any) => {
      let item = res.data
      payloadList.value = item.data
      meta.total = item.meta.total
      meta.page  = item.meta.page
    })
    .catch((err: any) => {
      console.log(err);
    })
}

/* Fungsi menampilkan modal */
const showHideModal = (): void => {
  $('#myModal').modal('show') ? $('#myModal').modal('hide') : $('#myModal').modal('show')
}

/* Fungsi untuk mengambil page baru berdasarkan paggination */
const paggination = (data: any) => {
  meta.page = data.n_page
  getPayloadList()
}

const sortingData = (sort: string, by: keyof SortIcon): void => {
  
  if (sort == 'asc') {
    meta.orderBy = by
    meta.sort = 'desc'
    meta.sortIcon[by] = 'fa-sort-up'
  } else if (sort == 'desc') {
    meta.orderBy = by
    meta.sort = 'asc'
    meta.sortIcon[by] = 'fa-sort-down'
  }

  if (by === '_jurusan') {
    meta.sortIcon.created_at = 'fa-sort'
  } else if (by === 'created_at') {
    meta.sortIcon._jurusan = 'fa-sort'
  }

  getPayloadList()
  console.log(sort);
  
}

onMounted((): void => {
  getPayloadList()
})
</script>