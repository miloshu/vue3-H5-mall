import axios from 'axios'
export const request = (params: object) => {
  return new Promise((resolve, reject) => {
    axios({
      ...params,
      headers: {
        AUTH_TOKEN: ''
      },
      responseType: 'json',
      baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
      method: params.method || 'get',
    }).then(function (response) {
      resolve(response.data);
    }).catch((error) => {
      reject(error)
    })
  })
}