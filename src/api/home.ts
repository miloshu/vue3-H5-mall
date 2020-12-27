// 该接口仅供学习
// https://api-hmugo-web.itheima.net/api
// import request from '/@/utils/request'
import axios from 'axios'
const baseURL = 'https://api-hmugo-web.itheima.net'
// 轮播图
export function getSwiperList(params: object) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/home/swiperdata`,
    params
  })
}
// 获取导航数据
export function getCateLIst(params: object) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/home/catitems`,
    params
  })
}
// 楼层数据
export function getFloorLIst(params: object) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/home/floordata`,
    params
  })
}
