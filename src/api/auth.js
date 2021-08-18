import request from '@src/utility/request'

export function member() {
    return request({
        url: 'api/login/member',
        method: 'get'
    })
}

export function login({ member, password }) {
    return request({
        url: 'api/login/login',
        method: 'post',
        data: { member, password }
    })
}
// member: "CAGI319290"
// token: "B3218246312806741584782463"
// gesture_password: 88888888

export function register({ uuid = "", phone, member, nick_name, password, password_re, pay_password, pay_password_re, code, gesture_password = '88888888' }) {
    return request({
        url: 'api/login/register',
        method: 'post',
        data: { uuid, phone, member, nick_name, password, password_re, pay_password, pay_password_re, code, gesture_password }
    })
}

export function forgetPassword({ phone, member, password, password_re, pay_password, pay_password_re, code }) {
    return request({
        url: 'api/login/forgetPassword',
        method: 'post',
        data: { phone, member, password, password_re, pay_password, pay_password_re, code }
    })
}




export function userInfo() {
    // return request({
    //     url: 'api/user/userInfo',
    //     method: 'get'
    // })

    var res = {"errcode":0,"msg":"","res":{"rank_name":"J0","nick_name":"ben05","head_image":"","member":"CAGI636729","uuid":"JLOAJIR3","phone":"6544445678","group_person_count":0,"group_achievement_money":"0.0000","achievement_money":"18700.0000","is_investment":1,"investment_money":"408100.0000"}}
    return new Promise((resolve, reject) => {
        resolve(res)
      })
}


export function sendSms(phone) {
    return request({
        url: 'api/login/sendSms',
        method: 'post',
        data: { phone }
    })
}

// 重置登录密码
export function editPassword(data) {
    return request({
        url: 'api/user/editPassword',
        method: 'post',
        data
    })
}

// 重置支付密码
export function editPayPassword(data) {
    return request({
        url: 'api/user/editPayPassword',
        method: 'post',
        data
    })
}

// 修改个人信息提交
export function editUserInfo(data) {
    return request({
        url: 'api/user/editUserInfo',
        method: 'post',
        data
    })
}

// 重置手势密码
export function forgetGesturePassword(data) {
    return request({
        url: 'api/login/forgetGesturePassword',
        method: 'post',
        data
    })
}

// 获取手势密码
export function gesturePassword() {
    return request({
        url: 'api/user/gesturePassword',
        method: 'get'
    })
}