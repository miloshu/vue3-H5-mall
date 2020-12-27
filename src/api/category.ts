import axios from 'axios'
const baseURL = 'https://api-hmugo-web.itheima.net'
// 轮播图
export function getCategoriesList(params: object) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/categories`,
    params
  })
}
