import request from '@src/utility/request'

// 币种信息列表
export function currencyList() {
    // return request({
    //     url: 'api/currency/currencyList',
    //     method: 'get'
    // })

    let res = {"errcode":0,"msg":"success","res":[{"id":1,"name":"USDT","rate":100,"image":"","is_del":0},{"id":2,"name":"JYB","rate":10,"image":"","is_del":0},{"id":3,"name":"TBAU","rate":100,"image":"","is_del":0},{"id":4,"name":"PSBAU","rate":100,"image":"","is_del":0}]}
    return new Promise((resolve, reject) => {
        resolve(res)
      })
}

// 系统轮播消息
export function notice() {
    // return request({
    //     url: 'api/index/notice',
    //     method: 'get'
    // })

    let res = {"errcode":0,"msg":"","res":[{"id":1,"title":"系统内测公告","content":"cagi系统正在内测中，敬请期待！","order":1,"create_time":"2020-03-10 15:23:06","is_del":0}]}
    return new Promise((resolve, reject) => {
        resolve(res)
      })
}

// 创投记录列表
export function ventureList() {
    // return request({
    //     url: 'api/index/ventureList',
    //     method: 'get'
    // })
    let res = {"errcode":0,"msg":"","res":[{"content":"会员sdf*****成功参与创投获得6000分红金","id":9},{"content":"会员******成功参与创投获得3000分红金","id":8},{"content":"会员******成功参与创投获得15000分红金","id":7},{"content":"会员******成功参与创投获得10000分红金","id":6},{"content":"会员 少侠 成功参与创投获得1500分红金","id":5},{"content":"会员 帅哥 成功参与创投获得1500分红金","id":4},{"content":"会员小明成功参与创投获得1500分红金","id":3}]}
    return new Promise((resolve, reject) => {
        resolve(res)
      })
}

// 轮播图列表 1=首页,2=新闻页
export function banner(type) {
    // return request({
    //     url: 'api/index/banner',
    //     method: 'get',
    //     params: { type }
    // })

    let res = {"errcode":0,"msg":"","res":[{"id":8,"image":"\/imgs\/base\/15855474627730300.jpg","url":"","order":"1","create_time":"2020-03-27 10:56:19","type":2,"is_del":0}]}
    return new Promise((resolve, reject) => {
        resolve(res)
    })

}

// 新闻列表
export function news({ page, pagesize }) {
    // return request({
    //     url: 'api/news/news',
    //     method: 'get',
    //     params: { page, pagesize }
    // })

    let res = {"errcode":0,"msg":"成功","res":{"count":2,"page":"1","pagesize":"6","data":[{"id":1,"title":"新闻标题","image":"\/imgs\/base\/15852069124343835.jpg","content":"<p>新闻内容内容<\/p>\n<p>&nbsp;<\/p>","create_time":"2020-03-10 15:26:13","desc":"新闻简介","order":1,"is_del":0},{"id":2,"title":"新闻测试","image":"\/imgs\/base\/15852069251840149.jpg","content":"<p>这里是新闻内容<\/p>\n<p><img class=\"wscnph\" src=\"\/imgs\/file\/20200326\/1c3eee346e4a293d0d59cf54350cfa1e.jpg\" \/><\/p>","create_time":"2020-03-26 14:59:07","desc":"1","order":2,"is_del":0}]}}
    return new Promise((resolve, reject) => {
        resolve(res)
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

