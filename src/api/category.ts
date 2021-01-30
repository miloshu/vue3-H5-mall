import axios from 'axios'
const baseURL = 'https://api-hmugo-web.itheima.net'
// 商品列表
export function getCategoriesList(params: any) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/categories`,
    params
  })
}
// 商品列表搜索
export function searchCategoriesList(params: any) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/goods/search`,
    params
  })
}
// 商品详情
export function getGoodsDetailList(params: any) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/goods/detail`,
    params
  })
}
// 历史订单列表
export function getAllhistoryOrderList(params: any) {
  return axios({
    method: 'get',
    url: `${baseURL}/api/public/v1/my/orders/all`,
    params
  })
}