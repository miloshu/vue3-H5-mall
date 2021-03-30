import request from './request'

export const Login = (res) =>{
    return request({
        url:'/login',
        method: 'POST',
        data:res

    })
} 

export const UserInfo = (res) =>{
    return request({
        url:'/getInfo',
        method: 'POST',
        data:res
    })
}

export default {Login, UserInfo}