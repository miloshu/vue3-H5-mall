import axios from 'axios'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
axios.defaults.withCredentials = true

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === -1) {
      Notify({ type: 'danger', message: res.msg })
      setTimeout(() => {
        location.href = '/'
      }, 2000)
    } else if (res.code === 400) {
      Notify({ type: 'danger', message: res.msg })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
