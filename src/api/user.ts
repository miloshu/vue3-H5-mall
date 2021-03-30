// import http from './http'
import axios from 'axios'
export const Login = (data) =>{
    return axios({
        url: '/api/login',
        method: 'POST',
        data

    })
} 

export const UserInfo = (data) =>{
    return http({
        url: '/getInfo',
        method: 'POST',
        data
    })
}

export default {Login, UserInfo}