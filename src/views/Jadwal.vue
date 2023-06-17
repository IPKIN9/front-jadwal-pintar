<template>
  <section class="section">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <div class="input-group">
            <h3>TABEL KELAS</h3>
          </div>
          <div class="input-group">
          </div>
          <div class="input-group row ms-1">
            <p class="col-lg text-end"><i class="fa-solid fa-user me-1"></i> User: ADMIN</p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mt-3">
          <div class="col-lg-4">
            <SelectSearch @change="getCalendar" @setName="clearKelas" size="5" @search-event="getKelasPayload" @clear-data="clearKelas" :required="true" :list="kelasList" :show-up="kelasShow" v-model.number="scheduleMeta.kelas_id" label="Pilih Kelas" class="rounded-3" />
          </div>
          <div class="col-lg-4">
            <BaseSelect @change="getCalendar()" label="Bulan" :list="bulan" v-model.number="datePayload.bulan" />
          </div>
          <div class="col-lg-4">
            <BaseSelect label="Tahun" />
          </div>
        </div>
        <div class="mt-5" v-show="scheduleMeta.kelas_id !== 0">
          <table class="table table-bordered mb-0">
            <thead>
              <tr>
                <th class="cs-th">SENIN</th>
                <th class="cs-th">SELASA</th>
                <th class="cs-th">RABU</th>
                <th class="cs-th">KAMIS</th>
                <th class="cs-th">JUMAT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in newDates" :key="index">
                <td class="cs-td" v-for="(day, index2) in week" :key="index2" >
                  <a href="#" role="button" @click="getDetail({show:`${day.tgl} ${getMonthName(day.bulan)} ${day.tahun}`, val:`${day.tahun}-${day.bulan}-${day.tgl}`, type: 'new'}, {data: day.data})" :class="
                    (day.bulan === (datePayload.bulan - 1) && day.bulan !== 12) || 
                    (day.bulan === (datePayload.bulan + 1) && day.bulan !== 12) ||
                    ((datePayload.bulan === 12 && (day.bulan === 1 || day.bulan === 11)) || 
                    (datePayload.bulan === 1 && (day.bulan === 12) || day.bulan === 2))? 'disabled' : ''">
                    <div class="px-2 pt-2 row">
                      <div class="col-lg-3">
                        <h3>{{ day.tgl }}</h3>
                      </div>
                      <div v-if="day.data.length >= 2" class="col-lg d-flex justify-content-end">
                        <div class=""><span class="badge bg-success">Full</span></div>
                      </div>
                      <div v-if="day.data.length === 1" class="col-lg d-flex justify-content-end">
                        <div class=""><span class="badge bg-primary">Sesi</span></div>
                      </div>
                      <div v-if="day.data.length === 0" class="col-lg d-flex justify-content-end">
                        <div class=""><span class="badge bg-light-secondary">Kosong</span></div>
                      </div>
                    </div>
                    <div class="row px-2 my-3" v-for="(d, index3) in day.data" :key="index3">
                      <div class="col-lg-12">
                        <div class="d-flex">
                          <small><span class="text-capitalize">{{ d.mapel }}</span> :<span> {{ d.guru }}</span></small>
                        </div>
                        <div class="d-flex"><small class="px-2 rounded-3"  style="background: #DDE6ED;">{{ d.jam_masuk }} - {{ d.jam_keluar }} WITA</small></div>
                      </div>
                    </div>
                    <div v-if="day.data.length <= 0" class="row px-2" style="margin: 43px 0;">
                      <div class="col-lg-12">
                        <div class="d-flex"><small class="px-2 py-2 rounded-3 text-muted">set sekarang</small></div>
                      </div>
                    </div>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <ModalComponent size="modal-lg" :is-modal-open="modalStatus" @close="showHideModal" ref="modal">
    <template v-slot:header>
      <h4 class="tex-center"><i class="fa-solid fa-file-invoice me-2 text-capitalize"></i> Jadwal Hari Ini - {{ dateNow.show }}</h4>
    </template>
    <template v-slot:body>
      <div class="row px-2">
        <div class="col-lg-6">
          <div class="mb-3"><p>Pastikan semua data terisi sebelum melakukan proses</p></div>
        </div>
        <div class="col-lg-6">
          <span class="d-flex justify-content-end"><small>RPL 1</small><small class="text-muted ms-2">:KELAS</small></span>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group mt-2 mb-3 mx-2">
            <SelectSearch size="5" @search-event="getMapelList" @clear-data="clearMapel" :list="mapelList" :show-up="mapelShow" label="Mata Pelajaran" :required="true" v-model.number="schedulePayload.mapel" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group mt-2 mb-3 mx-2">
            <BaseSelectSchedule size="5" :tgl="dateNow.val" :list-schedule="allScheduleList" @search-event="getGuruList" @clear-data="clearGuru" :list="guruList" :show-up="guruShow" label="Guru" :required="true" v-model.number="schedulePayload.guru_id" />
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div v-if="!checkJamMasuk('07:00:00')" class="col-lg-6 mb-5 text-center"><BaseButton class="btn-info px-5">TAMBAHKAN KE SESI 1</BaseButton></div>
        <div v-if="!checkJamMasuk('11:16:00')" class="col-lg-6 mb-5 text-center"><BaseButton class="btn-primary px-5">TAMBAHKAN KE SESI 2</BaseButton></div>
      </div>
      <div class="row mt-3">
        <span class="col-lg-6 text-start"><p class="ms-4">GURU / MATA PELAJARAN</p></span>
        <span class="col-lg-6 text-end"><p class="me-4">AKSI</p></span>
        <div v-if="detailPayload.length <= 0" class="d-flex justify-content-center">
          <p class="text-muted my-5 text-uppercase">Data Belum Diset</p>
        </div>
        <div v-for="(detail, index) in detailPayload" :key="index">
          <div class="divider col-lg-12">
            <div class="divider-text">{{ detail.jam_masuk }} - {{ detail.jam_keluar }}</div>
          </div>
          <div class="row">
            <div class="col-lg-6 text-start">
            <div class="ms-4">
              <p class="mb-1"><i class="fa-solid fa-user me-2 text-muted"></i> {{ detail.guru }} </p>
              <span class="fs-5 fw-bold text-uppercase"> {{ detail.mapel }}</span>
            </div>
            </div>
            <div class="col-lg-6 text-end">
              <div class="btn-group" role="group" aria-label="Basic example">
                  <BaseButton @event-click="insertSchedule('07:00:00', '11:15:00')" class="btn-default">Edit</BaseButton>
                  <BaseButton class="btn-default">Hapus</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <!-- <BaseButton @event-click="insertSchedule" :disabled="loading ? true : false" class="btn-primary">Proses <Loading v-if="loading" /></BaseButton> -->
      <BaseButton :disabled="loading ? true : false" class="btn-default" @event-click="showHideModal">Tutup</BaseButton>
    </template>
  </ModalComponent>
</template>
<style>
  .cs-th {
    text-align: center;
    width: 20%;
  }

  .cs-td {
    text-decoration: none;
    transition: box-shadow 0.3s;
  }

  .cs-td:hover {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .disabled {
    opacity: 0.5; /* Mengatur transparansi elemen */
    pointer-events: none; /* Menonaktifkan interaksi dengan elemen */
    cursor: not-allowed; /* Mengubah kursor menjadi 'not-allowed' */
  }

  .calendar-enter-active {
    transition: all 0.3s ease;
  }

  .v-enter-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .calendar-enter-from,
  .calendar-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .calendar {
    overflow: hidden;
  }

  .day-enter-active {
    transition: all 0.3s ease;
  }

  .day-enter-from,
  .day-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .day {
    overflow: hidden;
  }
</style>
<script setup lang="ts">
import BaseSelect from '@/components/input/BaseSelect.vue';
import SelectSearch from '@/components/input/SelectSearch.vue';
import { onMounted, reactive, ref } from 'vue';
import detailJadwal from '../utils/api/detail-jadwal'
import Calendar from '../utils/other/Calendar'
import ModalComponent from '@/components/modal/FormModal.vue';
import BaseButton from '@/components/button/BaseButton.vue';
import guru from '@/utils/api/guru';
import mapel from '@/utils/api/mapel';
import BaseSelectSchedule from '../components/input/BaseSelectSchedule.vue'
import kelas from '@/utils/api/kelas';

const loading = ref(false)

/* Fungsi untuk mengambil data dari detail jadwal */
interface ScheduleMeta {
  kelas_id : number
  start_date: string
  end_date  : string
}

const scheduleMeta: ScheduleMeta = reactive({
  kelas_id : 0,
  start_date: '',
  end_date  : ''
})

const scheduleMeta2 = reactive({
  kelas_id : null,
  start_date: '',
  end_date  : ''
})

const scheduleList = ref<any[]>()
const allScheduleList = ref<any[]>()

const getSchedule = async () => {
  await detailJadwal.getAll(scheduleMeta)
  .then((res) => {
    let data = res.data.data
    scheduleList.value = data
    for (const key in data) {
      pushScheduleToCalendar(data[key])
    }
  })
  .catch((err) => {
    console.log(err);
    
  })
}

const getAllSchedule = async () => {
  await detailJadwal.getAll(scheduleMeta2)
  .then((res) => {
    let data = res.data.data
    allScheduleList.value = data
  })
  .catch((err) => {
    console.log(err);
    
  })
}

/* Fungsi tambah edit data */
interface SchedulePayload {
  [key: string]: any;
}

const schedulePayload: SchedulePayload = reactive({
  kelas_id: 0,
  guru_id: 0,
  mapel: '',
  jumlah_jam: 5,
  tgl: '',
  jam_masuk: '',
  jam_keluar: ''
})

const insertSchedule = (jam_masuk: string, jam_keluar: string): void => {
  schedulePayload.jam_masuk = jam_masuk
  schedulePayload.jam_keluar = jam_keluar
  schedulePayload.tgl = dateNow.val
  console.log(schedulePayload);
}

/* Fungsi untuk mengambil data kelas */
const kelasList = ref<[]>()
const kelasShow: {key:string, name: string} = {
  key: 'id',
  name: '_kelas'
}

const getKelasPayload = (kelasPayload: any): void => {
  kelas.getAll({
    search: kelasPayload,
    limit: 50,
    page: 1,
    orderBy: '_kelas',
    sort: 'asc'
  })
  .then((res) => {
    kelasList.value = res.data.data
  })
  .catch((err) => {
    console.log(err);
    
  })
}

const clearKelas = (): void => {
  kelasList.value = []
}

/* Fungsi mengambil data guru */
const guruList = ref<[]>()

const guruShow: {key:string, name: string} = {
  key: 'id',
  name: 'nama'
}
const getGuruList = (guruPayload: string) => {
  guru.getAll({
    search : guruPayload,
    page   : 1,
    limit  : 100,
    orderBy: 'nama',
    sort   : 'asc',
  })
  .then((res) => {
    guruList.value = res.data.data
  })
  .catch((err) => {
    console.log(err);
    
  })
}

const clearGuru = (): void => {
  mapelList.value = []
}

/* Fungsi mengambil data matapelajaran */
const mapelList = ref<[]>()

const mapelShow: {key:string, name: string} = {
  key: 'nama_mapel',
  name: 'nama_mapel'
}
const getMapelList = (mapelPayload: string) => {
  mapel.getAll({
    search : mapelPayload,
    page   : 1,
    limit  : 100,
    orderBy: 'nama_mapel',
    sort   : 'asc',
  })
  .then((res) => {
    mapelList.value = res.data.data
  })
  .catch((err) => {
    console.log(err);
    
  })
}

const clearMapel = (): void => {
  mapelList.value = []
}

/* Detail schedule */
interface DetailItem {
  id: number;
  kode: string;
  kelas_id: number;
  guru: string;
  guru_id: number;
  mapel: string;
  jumlah_jam: number;
  tgl: string;
  jam_masuk: string;
  jam_keluar: string;
  created_at: string;
  updated_at: string;
}

const detailPayload = ref<any>()

const checkJamMasuk = (timeNow: string): boolean => {
  return detailPayload.value.some((item: DetailItem) => item.jam_masuk === timeNow);
}

const getDetail = (params: any, data: any): void => {
  showHideModal(params)
  detailPayload.value = data.data
}

/* Fungsi lainnya */
interface DatePayload {
  bulan: number
  tahun: number
}

const datePayload: DatePayload = reactive({
  bulan: 6,
  tahun: 2023
})

const getCalendar = (): void => {
  newDates.value = Calendar.getDate(datePayload.tahun, datePayload.bulan);
  
  let lengthWeek = newDates.value.length - 1
  let lengthDay  = newDates.value[lengthWeek].length - 1
  
  let start_date: string = `${newDates.value[0][0].tahun }-${newDates.value[0][0].bulan}-${newDates.value[0][0].tgl}`
  let end_date  : string = `${newDates.value[lengthWeek][lengthDay].tahun }-${newDates.value[lengthWeek][lengthDay].bulan}-${newDates.value[lengthWeek][lengthDay].tgl}`

  scheduleMeta.start_date = start_date
  scheduleMeta.end_date   = end_date

  scheduleMeta2.start_date = start_date
  scheduleMeta2.end_date   = end_date

  getSchedule()
  getAllSchedule()
}

const pushScheduleToCalendar = (params: any): void => {
  const datas = params
  const dateStr = datas.tgl;
  const dateParts = dateStr.split("-");

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const result = newDates.value.find((arr) => {
    return arr.some((obj) => obj.tgl === day && obj.bulan === month);
  });

  if (result) {
    result[1].data.push(params)    
  } 
}

const newDates = ref<DateObject[][]>([]);

const bulan = [
  {lable: 'januari'  , val: 1 },
  {lable: 'februari' , val: 2 },
  {lable: 'maret'    , val: 3 },
  {lable: 'april'    , val: 4 },
  {lable: 'mei'      , val: 5 },
  {lable: 'juni'     , val: 6 },
  {lable: 'juli'     , val: 7 },
  {lable: 'agustus'  , val: 8 },
  {lable: 'september', val: 9 },
  {lable: 'oktober'  , val: 10},
  {lable: 'november' , val: 11},
  {lable: 'desember' , val: 12}
]

const getMonthName = (monthVal: number) => {
  const month = bulan.find(item => item.val === monthVal);

  if (month) {
    return month.lable;
  } else {
    return 'bulan tidak ditemukan'
  }
}

interface DateObject {
  hari : string;
  tgl  : number;
  bulan: number;
  tahun: number;
  data : any[]
}

const dateNow: any = reactive({
  show: '',
  val : ''
})

const modalStatus = ref(false)
const showHideModal = (properties: any): void => {
  modalStatus.value = modalStatus.value ? false : true
  if (properties.type === 'new') {
    dateNow.show = properties.show
    dateNow.val  = properties.val
  }
}

// const  speakerInitials = (speaker:string) => {
//   const name = speaker.split(' ')
//   return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
// }

onMounted(() => {
  getCalendar()
})
</script>