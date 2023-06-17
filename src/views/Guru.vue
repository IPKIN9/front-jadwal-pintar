<template>
  <section class="section">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h3>TABEL GURU</h3>
          <BaseButton class="btn-primary" @event-click="showHideModal({ type: 'new-data' })">Tambah Data</BaseButton>
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
              </select><label>entries per page</label>
            </div>
            <div class="dataTable-search">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                <input class="dataTable-input" placeholder="Search..." type="text" v-model="meta.search"
                  @keyup="getPayloadList()">
              </div>
            </div>
          </div>
          <div class="dataTable-container mt-3">
            <table class="table" id="table1">
              <thead>
                <tr>
                  <th style="width: 5%;"><a href="#">No.</a></th>
                  <th><a @click="sortingData(meta.sort, 'nama')" href="#"
                      class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon.nama"></i> Nama</a></th>
                  <th><a @click="sortingData(meta.sort, 'pangkat')" href="#"
                      class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon.pangkat"></i> Pangkat</a></th>
                  <th><a @click="sortingData(meta.sort, 'mata_pelajaran')" href="#"
                      class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon.mata_pelajaran"></i> Mata Pelajaran</a></th>
                  <th class="dataTable-sorter"><a href="#">Keterangan</a></th>
                  <th><a @click="sortingData(meta.sort, 'created_at')" href="#"
                    class="dataTable-sorter"><i class="fa-solid me-1" :class="meta.sortIcon.created_at"></i> Dibuat</a>
                  </th>
                  <th><a href="#" class="dataTable-sorter">Diupdate</a></th>
                  <th><a href="#" class="dataTable-sorter">Aksi</a></th>
                </tr>
              </thead>
              <TransitionGroup name="table" tag="tbody">
                <tr v-for="(guru, index) in payloadList" :key="index">
                  <td>{{ index + 1 }}.</td>
                  <td class="text-capitalize">
                    <div class="d-flex fs-6 text-uppercase"><b>{{ guru.nama }}</b></div>
                    <div class="d-flex text-muted small">Nip: {{ guru.nip }}</div>
                  </td>
                  <td class="text-capitalize">{{ guru.pangkat }}</td>
                  <td class="text-capitalize">
                    <div class="d-flex">{{ guru.mata_pelajaran }}</div>
                    <div class="d-flex">Total Jam <i class="mx-2 mt-1 fas fa-clock"></i>: {{ guru.jumlah_jam }} Jam</div>
                  </td>
                  <td class="text-capitalize">{{ guru.ket ? guru.ket : 'kosong' }}</td>
                  <td>{{ moment(guru.created_at).format('DD, MMMM YYYY') }}</td>
                  <td>{{ moment(guru.updated_at).format('DD, MMMM YYYY') }}</td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                      <BaseButton :data-id="guru.id" :row-data="payloadList[index]" @event-click="editPayload"
                        class="btn"><i class="text-primary fas fa-pencil mx-2"></i></BaseButton>
                      <BaseButton :data-id="guru.id" class="btn" @event-click="deletePayload"><i
                          class="text-danger fas fa-trash mx-2"></i></BaseButton>
                    </div>
                  </td>
                </tr>
              </TransitionGroup>
            </table>
            <TransitionGroup name="defend" tag="div" class="d-flex justify-content-center" >
              <h5 class="text-muted py-3" v-if="meta.total === 0">Belum ada data dalam tabel ini!</h5>
              <h5 class="text-muted py-3" v-if="meta.total_in_page === 0 && meta.total !== 0">Data tidak ditemukan!</h5>
            </TransitionGroup>
          </div>
          <Transition>
            <Paggination v-show="meta.search.length <= 0 && meta.total > meta.limit" :page="meta.page" :total="meta.total" :limit="meta.limit"
              @event-click="paggination" />
          </Transition>
        </div>
      </div>
    </div>
  </section>
  <ModalComponent size="modal-xl" :is-modal-open="modalStatus" @close="showHideModal" ref="modal">
    <template v-slot:header>
      <h4><i class="fa-solid fa-file-invoice me-2"></i> Formulir Data</h4>
    </template>
    <template v-slot:body>
      <div class="mx-2 py-3">
        <p class="text-muted mb-3 ms-3">Harap periksa formulir anda sebelum dikirim dan disimpan.</p>
        <div class="row">
          <div class="col-lg mx-3 form-group mb-4">
            <BaseInput label="Nama Guru" :required="true" v-model="payload.nama" placeholder="Masukan disini..." />
            <small class="text-danger">
              {{ guruError.nama }}
            </small>
          </div>
          <div class="col-lg mx-3 form-group mb-4">
            <BaseInput label="NIP" :required="true" v-model="payload.nip" placeholder="Masukan disini..." />
            <small class="text-danger">
              {{ guruError.nip }}
            </small>
          </div>
        </div>
        <div class="row">
          <div class="col-lg mx-3 form-group mb-4">
            <SelectSearch size="5" @search-event="getpangkatPayload" :required="true" @clear-data="clearPangkat" label="Pangkat" :list="pangkatList" :show-up="pangkatShow" v-model.number="payload.pangkat_id" />
            <small class="text-danger">
              {{ guruError.mapel_id }}
            </small>
          </div>
          <div class="col-lg mx-3 form-group mb-4">
            <SelectSearch size="5" @search-event="getMapelPayload" :required="true" @clear-data="clearMapel" label="Mata Pelajaran" :list="mapelList" :show-up="mapelShow" v-model.number="payload.mapel_id" />
            <small class="text-danger">
              {{ guruError.mapel_id }}
            </small>
          </div>
        </div>
        <div class="row">
          <div class="col-lg mx-3 form-group mb-4">
            <BaseInput label="Jumlah Jam" :required="true" v-model.number="payload.jumlah_jam" placeholder="Masukan disini..." />
            <small class="text-danger">
              {{ guruError.jumlah_jam }}
            </small>
          </div>
          <div class="col-lg mx-3 form-group mb-4">
            <BaseInput label="Keterangan" :required="false" v-model.number="payload.ket" placeholder="Masukan disini..." />
            <small class="text-danger">
              {{ guruError.ket }}
            </small>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <BaseButton :disabled="loading ? true : false" class="btn-primary" @event-click="upsertPayload()">Proses <Loading v-if="loading" /></BaseButton>
      <BaseButton :disabled="loading ? true : false" class="btn-default" @event-click="showHideModal">Tutup</BaseButton>
    </template>
  </ModalComponent>
</template>
<style>
.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.table-enter-active {
  transition: all 0.3s ease;
}

.table-enter-from,
.table-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.table {
  overflow: hidden;
}

.defend-enter-active {
  transition: all 0.1s ease;
}

.defend-enter-active{
  transition-delay: 0.1s;
}

.defend-enter-from,
.defend-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.defend {
  overflow: hidden;
}
</style>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import moment from 'moment'
import guru from '../utils/api/guru'
import BaseButton from '@/components/button/BaseButton.vue'
import Paggination from '../components/skelton/Paggination.vue'
import ModalComponent from '../components/modal/FormModal.vue'
import BaseInput from '@/components/input/BaseInput.vue'
import SweetAlert from '../utils/other/SweetAlert'
import IziToast from '../utils/other/IziToast'
import Loading from '@/components/other/Loading.vue'
import * as Yup from 'yup'
import SelectSearch from '@/components/input/SelectSearch.vue'
import mapel from '@/utils/api/mapel'
import pangkat from '@/utils/api/pangkat'

const loading = ref(false)

/* Fungsi untuk mengambil data kelas */
const payloadList = ref()

interface SortIcon {
  nama           : string,
  mata_pelajaran : string,
  pangkat        : string,
  created_at     : string,
}

interface Meta {
  sortIcon     : SortIcon,
  search       : string;
  limit        : number;
  page         : number;
  total        : number;
  orderBy      : string;
  sort         : string;
  total_in_page: number
}

const meta: Meta = reactive({
  sortIcon: {
    nama           : 'fa-sort',
    mata_pelajaran : 'fa-sort',
    pangkat        : 'fa-sort',
    created_at     : 'fa-sort-up'
  },
  search       : "",
  limit        : 10,
  page         : 1,
  total        : 10,
  orderBy      : "created_at",
  sort         : "desc",
  total_in_page: 10
})

const getPayloadList = (): void => {
  guru.getAll(meta)
    .then((res: any) => {
      let item           = res.data
      payloadList.value  = item.data
      meta.total         = item.meta.total
      meta.page          = item.meta.page
      meta.total_in_page = item.meta.total_in_page      
    })
    .catch((err: any) => {
      if (err.response) {
        IziToast.errorNotif(err.response.status)
      } else {
        IziToast.errorNotif(900)
      }
    })
}

/* Fungsi untuk menambahkan data */
interface Payload {
  [key: string]: any;
}

const payload: Payload = reactive({
  nama: '',
  nip: '',
  mapel_id: '',
  pangkat_id: '',
  jumlah_jam: '',
  ket: ''
})

const guruError: any = ref('');

const upsertPayload = async () => {
  try {
    const payloadSchema = Yup.object().shape({
      nama: Yup.string()
      .required('Field harus diisi')
      .min(2, 'Field minimal terdiri dari 2 karakter')
      .max(150, 'Field maksimal terdiri dari 150 karakter'),
      nip: Yup.string()
      .typeError('Field harus berisi huruf')
      .required('Field harus diisi')
      .min(15, 'Field minimal terdiri dari 15 karakter')
      .max(20, 'Field maksimal terdiri dari 20 karakter'),
      mapel_id: Yup.number()
      .typeError('Field harus bertipe nomor')
      .required('Field harus diisi'),
      pangkat_id: Yup.number()
      .required('Field harus diisi'),
      jumlah_jam: Yup.number()
      .typeError('Field harus bertipe nomor')
      .required('Field harus diisi'),
      ket: Yup.string()
      .max(255, 'Field maksimal terdiri dari 20 karakter'),
    });
    
    await payloadSchema.validate(payload, { abortEarly: false });
    
    loading.value = true
    guru.upsert(payload)
      .then((res: any) => {
        loading.value = false
        showHideModal({ type: '' })
        IziToast.successNotif({
          title: 'Tersimpan',
          message: 'Berhasil menyimpan data ke database'
        })
      })
      .catch((err: any) => {
        if (err.response) {
          IziToast.errorNotif(err.response.status)
        } else {
          IziToast.errorNotif(900)
        }
      })

  } catch (err: any) {
    const errorMessages = err.inner.reduce((errors: any, error: any) => {
      errors[error.path] = error.message;
      return errors;
    }, {});
    loading.value = false
    guruError.value = errorMessages;
  }
}

/* Fungsi untuk mengedit data */
const editPayload = (params: any): void => {
  let rowData = params.rowData
  for (const key in rowData) {
    if (key === 'created_at' || key === 'updated_at') {
      continue
    }
    if (key === 'pangkat') {
      getpangkatPayload(rowData[key])
    } else if (key === 'mata_pelajaran') {
      getMapelPayload(rowData[key])
    }
    payload[key] = rowData[key]
  }

  showHideModal({ type: 'editedData' })
}

/* Fungsi untuk menghapus data */
const deletePayload = (params: any): void => {
  SweetAlert.confirmNotif(() => {
    guru.delete(params.dataId)
      .then((res) => {
        IziToast.successNotif({
          title: 'Terhapus',
          message: 'Berhasil menyimpan dihapus'
        })
        if (payloadList.value.length <= 1) {
          meta.page = 1
        }
        getPayloadList()
      })
      .catch((err) => {
        if (err.response) {
          IziToast.errorNotif(err.response.status)
        } else {
          IziToast.errorNotif(900)
        }
      })
  })
}

/* Fungsi untuk mencari data mapel */
const mapelList = ref()

const mapelShow: {key:string, name: string} = {
  key: 'id',
  name: 'nama_mapel'
}

const getMapelPayload = (mapelPayload: any): void => {
  mapel.getAll({
    search: mapelPayload,
    page: 1,
    limit: 100,
    orderBy: 'nama_mapel',
    sort: 'desc'
  })
  .then((res: any) => {
    mapelList.value = res.data.data
  })
  .catch((err: any) => {
    if (err.response) {
      IziToast.errorNotif(err.response.status)
    } else {
      IziToast.errorNotif(900)
    }
  })
}

const clearMapel = (): void => {
  mapelList.value = []
}


/* Fungsi untuk mencari data pangkat */
const pangkatList = ref()

const pangkatShow: {key:string, name: string} = {
  key: 'id',
  name: '_pangkat'
}

const getpangkatPayload = (pangkatPayload: any): void => {
  pangkat.getAll({
    search: pangkatPayload,
    page: 1,
    limit: 100,
    orderBy: '_pangkat',
    sort: 'desc'
  })
  .then((res: any) => {
    pangkatList.value = res.data.data
  })
  .catch((err: any) => {
    if (err.response) {
      IziToast.errorNotif(err.response.status)
    } else {
      IziToast.errorNotif(900)
    }
  })
}

const clearPangkat = (): void => {
  pangkatList.value = []
}

/* Fungsi menampilkan modal */
const modalStatus = ref(false)
const showHideModal = (properties: any): void => {
  if (properties.type === 'new-data') {
    clearPayload()
  }

  modalStatus.value = modalStatus.value ? false : true
  if (modalStatus.value === false) {
    getPayloadList()
  }
}

/* Fungsi untuk mengambil page baru berdasarkan paggination */
const paggination = (data: any) => {
  meta.page = data.n_page
  getPayloadList()
}

/* Fungsi untuk mengurutkan data dalam tabel */
const sortingData = (sort: string, by: keyof SortIcon): void => {
  for (const key in meta.sortIcon) {
    if (by === (meta.sortIcon as any)[key]) {
      continue
    }
    (meta.sortIcon as any)[key] = 'fa-sort'
  }

  if (sort == 'asc') {
    meta.orderBy = by
    meta.sort = 'desc'
    meta.sortIcon[by] = 'fa-sort-up'
  } else if (sort == 'desc') {
    meta.orderBy = by
    meta.sort = 'asc'
    meta.sortIcon[by] = 'fa-sort-down'
  }

  getPayloadList()
}

/* Fungsi untuk membersihkan daftar payload */
const clearPayload = (): void => {
  guruError.value = ''
  mapelList.value = []
  pangkatList.value = []
  for (const key in payload) {
    switch (typeof payload[key]) {
      case 'string':
        payload[key] = ''
        break;
      case 'number':
        payload[key] = ''
        break;
      case 'boolean':
        payload[key] = false
        break;
    
      default:
        break;
    }
  }
  if ('id' in payload) {
    delete payload.id
  }
}

onMounted((): void => {
  getPayloadList()
})
</script>