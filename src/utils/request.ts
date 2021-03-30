import axios from 'axios'
import { Notify } from 'vant'
import store from "../store";
import { useRouter } from 'vue-router'
// axios.defaults.withCredentials = true // withCredentials为true要求在请求头里带上cookie

const service = axios.create({
  baseURL: 'http://api-hmugo-web.itheima.net',
  withCredentials: false,
  timeout: 5000
})

// request请求拦截器
service.interceptors.request.use(
  config => {
    // config.headers['token'] = store.state.token
    return config
  },
  error => {
    // Notify.clear();
    console.log('error:', error)
    return Promise.reject('error:' + error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.status && res.status !== 200) {
    //   Notify({ type: 'danger', message: res.msg })
    //   return Promise.reject(res)
    // } else {
    //   return Promise.resolve(res)
    // }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
