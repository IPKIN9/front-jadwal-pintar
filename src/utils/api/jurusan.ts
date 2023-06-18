import AuthConfig from '../other/AuthConfig';
import server from './main'

const baseUrl : string = import.meta.env.VITE_SERVICE_URL
const endPoint: string = "/v1/jurusan/"

export default {
  getAll(params: {limit: number; page: number; search: string; orderBy: string; sort: string}) {
    return server(baseUrl).get(
      `${endPoint}?search=${params.search}&limit=${params.limit}&page=${params.page}&orderBy=${params.orderBy}&sort=${params.sort}`, AuthConfig.getToken()
    )
  },

  upsert(payload: any) {
    return server(baseUrl).post(endPoint, payload, AuthConfig.getToken())
  },

  getById(id: number | string) {
    return server(baseUrl).get(`${endPoint}${id}`, AuthConfig.getToken())
  },

  delete(id: number | string) {
    return server(baseUrl).delete(`${endPoint}${id}`, AuthConfig.getToken());
  }
}