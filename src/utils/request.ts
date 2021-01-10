import axios from 'axios'
import { Notify } from 'vant'
import store from "../store";
import { useRouter } from 'vue-router'
axios.defaults.withCredentials = true

const service = axios.create({
  baseURL: 'http://api-hmugo-web.itheima.net',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['token'] = store.state.token
    return config
  },
  error => {
    // Notify.clear();
    console.log('error:', error)
    return Promise.reject('error:' + error)
  }
)

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
    return new Promise((resolve, reject) => void {
      // ......
    })
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
