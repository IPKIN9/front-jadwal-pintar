<template>
  <section class="section">
    <div class="card">
      <div class="card-header">
        <h3>TABEL JURUSAN</h3>
      </div>
      <div class="card-body">
        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
          <div class="dataTable-top d-flex justify-content-between">
            <div class="dataTable-dropdown"><select class="dataTable-selector form-select">
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select><label>entries per page</label></div>
            <div class="dataTable-search">
              <input class="dataTable-input" placeholder="Search..." type="text">
            </div>
          </div>
          <div class="dataTable-container">
            <table class="table" id="table1">
              <thead>
                <tr>
                  <th style="width: 5%;"><a href="#">No.</a></th>
                  <th style="width: 41.862%;"><a href="#" class="dataTable-sorter"><i class="fa-solid fa-sort me-1"></i> Nama</a></th>
                  <th style="width: 18.8881%;"><a href="#" class="dataTable-sorter"><i class="fa-solid fa-sort me-1"></i> Dibuat</a></th>
                  <th style="width: 16.3429%;"><a href="#" class="dataTable-sorter"><i class="fa-solid fa-sort me-1"></i> Diupdate</a></th>
                  <th style="width: 11.1186%;"><a href="#" class="dataTable-sorter"><i class="fa-solid fa-sort me-1"></i> Aksi</a></th>
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
          <div class="dataTable-bottom">
            <Paggination :page="meta.page" :total="meta.total" :limit="meta.limit" @event-click="paggination" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import jurusan from '@/utils/api/jurusan'
import moment from 'moment'
import BaseButton from '@/components/button/BaseButton.vue'
import Paggination from '../components/skelton/Paggination.vue'

/* Fungsi untuk mengambil data jurusan */
const payloadList = ref()

const meta = reactive({
  search: "",
  limit: 10,
  page: 1,
  total: 0,
  orderBy: "created_at",
  sort: "desc"
})

const getPayloadList = (): void => {
  jurusan.getAll(meta)
    .then((res: any) => {
      let item = res.data
      payloadList.value = item.data
      meta.total = 50
    })
    .catch((err: any) => {
      console.log(err);
    })
}

/* Fungsi untuk mengambil page baru berdasarkan paggination */
const paggination = (data: any) => {
  meta.page = data.n_page

  getPayloadList()
}

onMounted((): void => {
  getPayloadList()
})
</script>