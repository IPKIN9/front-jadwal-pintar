import server from './main'

const baseUrl : string = import.meta.env.VITE_SERVICE_URL
const endPoint: string = "/v1/users"

export default {
  getRoles(username: string) {
    return server(baseUrl).get(`/v1/roles?username=${username}`)
  }
}