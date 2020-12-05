import request from '../utils/request'
// 登录接口
export function getLogin(username,password){
    return request({
        url:`/login`,
        method:'POST',
        data:{
            username,
            password
        }
    })
}
// 退出登录
export function getLogout(){
    return request({
        url:'/logout',
        method:'POST'
    })
}