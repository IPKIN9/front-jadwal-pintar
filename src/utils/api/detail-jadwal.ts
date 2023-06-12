import server from './main'

const baseUrl : string = import.meta.env.VITE_SERVICE_URL
const endPoint: string = "/v1/detail/"

export default {
  // getAll(params: {jadwal_id: number; limit: number; page: number; search: string; orderBy: string; sort: string}) {
  //   return server(baseUrl).get(
  //     `${endPoint}jadwal/?jadwal_id=${params.jadwal_id}search=${params.search}&limit=${params.limit}&page=${params.page}&orderBy=${params.orderBy}&sort=${params.sort}`
  //   )
  // },

  getAll(params: {jadwal_id: number; start_date: string; end_date: string;}) {
    return server(baseUrl).get(
      `${endPoint}jadwal/?jadwal_id=${params.jadwal_id}&start_date=${params.start_date}&end_date=${params.end_date}`
    )
  },

  scaningJadwal(params: {jadwal_id: number; guru_id: number; tgl: string; jam_masuk: string; jam_keluar: string;}) {
    return server(baseUrl).get(
      `${endPoint}scanning?jadwal_id=${params.jadwal_id}&guru_id=${params.guru_id}&tgl=${params.tgl}&jam_masuk=${params.jam_masuk}&jam_keluar=${params.jam_keluar}`
    )
  },

  upsert(payload: any) {
    return server(baseUrl).post(`${endPoint}jadwal`, payload)
  },

  getById(id: number | string) {
    return server(baseUrl).get(
      `${endPoint}jadwal/${id}`
    )
  },

  delete(id: number | string) {
    return server(baseUrl).delete(`${endPoint}jadwal/${id}`);
  }
}