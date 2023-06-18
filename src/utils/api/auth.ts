import server from './main'

const baseUrl : string = import.meta.env.VITE_SERVICE_URL
const endPoint: string = "/v1/oauth/token"

export default {
  loginProcess(payload: any) {
    return server(baseUrl).post(endPoint, payload)
  }
}