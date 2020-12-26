import request from '/@/utils/request'
import hex_sha1 from '/@/utils/sha1'
import md5 from "js-md5";

export function login(data: object) {
  return request({
    method: 'post',
    url: '/api/v1/login',
    params: {
      userName: data.userName,
      passWord: hex_sha1(md5(data.passWord)),
    }
  })
}
export function getData(data) {
  return request({
    url: `/api/v1/week/${data.id}/class/${data.classId}`,
    method: 'get',
    params: {
      startId: data.pindex,
      endId: data.endId,
    }
  })
}

export function getUserInfo(params) {
  return request({
    method: 'get',
    url: '/api/v1/login',
    params
  })
}
