import request from '@src/utility/request'

// 币种信息列表
export function currencyList() {
    // return request({
    //     url: 'api/currency/currencyList',
    //     method: 'get'
    // })

    var res = {"errcode":0,"msg":"success","res":[{"id":1,"name":"USDT","rate":100,"image":"","is_del":0},{"id":2,"name":"JYB","rate":10,"image":"","is_del":0},{"id":3,"name":"TBAU","rate":100,"image":"","is_del":0},{"id":4,"name":"PSBAU","rate":100,"image":"","is_del":0}]}
    return new Promise((resolve, reject) => {
        resolve(res)
      })
}

// 系统轮播消息
export function notice() {
    return request({
        url: 'api/index/notice',
        method: 'get'
    })
}

// 创投记录列表
export function ventureList() {
    return request({
        url: 'api/index/ventureList',
        method: 'get'
    })
}

// 轮播图列表 1=首页,2=新闻页
export function banner(type) {
    return request({
        url: 'api/index/banner',
        method: 'get',
        params: { type }
    })
}

// 新闻列表
export function news({ page, pagesize }) {
    return request({
        url: 'api/news/news',
        method: 'get',
        params: { page, pagesize }
    })
}

// 创投 套餐列表
export function investmentList() {
    return request({
        url: 'api/investment/investmentList',
        method: 'get'
    })
}

// 投资 类型;1=usdt投资,2=jyb投资
export function investmentConfirm({ type, investment_id }) {
    return request({
        url: 'api/investment/investmentConfirm',
        method: 'post',
        data: { type, investment_id }
    })
}

// 投资记录
export function investmentRecord() {
    return request({
        url: 'api/investment/investmentRecord',
        method: 'get'
    })
}

export function awardRecordList({ page, pagesize, award_id }) {
    return request({
        url: 'api/award/awardRecordList',
        method: 'get',
        params: { page, pagesize, award_id }
    })
}

// 推荐人员信息
export function teamInfo(member) {
    return request({
        url: 'api/user/teamInfo',
        method: 'get',
        params: { member }
    })
}

// 宝箱开奖
export function gift() {
    return request({
        url: 'api/index/gift',
        method: 'post'
    })
}


// 发件箱
export function userSend() {
    return request({
        url: 'api/mail/userSend',
        method: 'get'
    })
}


// 收件箱
export function userReceive() {
    return request({
        url: 'api/mail/userReceive',
        method: 'get'
    })
}

// 发送邮件
export function sendMail(data) {
    return request({
        url: 'api/mail/sendMail',
        method: 'post',
        data
    })
}

