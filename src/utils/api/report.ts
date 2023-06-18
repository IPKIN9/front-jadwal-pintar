import server from './main'

const baseUrl : string = import.meta.env.VITE_SERVICE_URL
const endPoint: string = "/v1/report/"

export default {
  getAll(params: {jurusan_id: number; limit: number; page: number; orderBy: string; sort: string; start: string; end: string}) {
    return server(baseUrl).get(
      `${endPoint}jadwal?jurusan_id=${params.jurusan_id}&limit=${params.limit}&page=${params.page}&orderBy=${params.orderBy}&sort=${params.sort}&start=${params.start}&end=${params.end}`
    )
  }
}