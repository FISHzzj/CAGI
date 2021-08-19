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

    let res = {"errcode":0,"msg":"","res":[{"id":8,"image":"http://cagi.315red.com.cn/imgs/base/15855474627730300.jpg","url":"","order":"1","create_time":"2020-03-27 10:56:19","type":2,"is_del":0}]}
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

    let res = {"errcode":0,"msg":"成功","res":{"count":2,"page":"1","pagesize":"6","data":[{"id":1,"title":"新闻标题","image":"http://cagi.315red.com.cn/imgs/base/15852069124343835.jpg","content":"<p>新闻内容内容<\/p>\n<p>&nbsp;<\/p>","create_time":"2020-03-10 15:26:13","desc":"新闻简介","order":1,"is_del":0},{"id":2,"title":"新闻测试","image":"http://cagi.315red.com.cn/imgs/base/15852069251840149.jpg","content":"<p>这里是新闻内容<\/p>\n<p><img class=\"wscnph\" src=\"http://cagi.315red.com.cn/imgs/file/20200326/1c3eee346e4a293d0d59cf54350cfa1e.jpg\" \/><\/p>","create_time":"2020-03-26 14:59:07","desc":"1","order":2,"is_del":0}]}}
    return new Promise((resolve, reject) => {
        resolve(res)
    })

}

// 创投 套餐列表
export function investmentList() {
    // return request({
    //     url: 'api/investment/investmentList',
    //     method: 'get'
    // })
    let res = {"errcode":0,"msg":"","res":[{"id":1,"name":"套餐A","base_price":"3000.00","price":"300.00","rate":"130.00","is_show":1,"is_del":0,"rank_id":1},{"id":2,"name":"套餐B","base_price":"15000.00","price":"1500.00","rate":"150.00","is_show":1,"is_del":0,"rank_id":1},{"id":3,"name":"套餐C","base_price":"30000.00","price":"3000.00","rate":"200.00","is_show":1,"is_del":0,"rank_id":1},{"id":4,"name":"套餐D","base_price":"100000.00","price":"10000.00","rate":"250.00","is_show":1,"is_del":0,"rank_id":1},{"id":5,"name":"套餐E","base_price":"300000.00","price":"30000.00","rate":"300.00","is_show":1,"is_del":0,"rank_id":5}]}
    return new Promise((resolve, reject) => {
        resolve(res)
    })
}

// 投资 类型;1=usdt投资,2=jyb投资
export function investmentConfirm({ type, investment_id }) {
    // return request({
    //     url: 'api/investment/investmentConfirm',
    //     method: 'post',
    //     data: { type, investment_id }
    // })
}

// 投资记录
export function investmentRecord() {
    // return request({
    //     url: 'api/investment/investmentRecord',
    //     method: 'get'
    // })

    var res = {"errcode":0,"msg":"","res":[{"currency_name":"USDT","investment_money":"1500.0000","create_time":"2021-08-12 11:39:08","investment_base_money":"15000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"10000.0000","create_time":"2021-08-09 11:08:09","investment_base_money":"100000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"300.0000","create_time":"2021-08-06 15:37:34","investment_base_money":"3000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"300.0000","create_time":"2021-08-06 15:37:30","investment_base_money":"3000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"300.0000","create_time":"2021-08-06 15:37:29","investment_base_money":"3000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"300.0000","create_time":"2021-08-03 23:56:20","investment_base_money":"3000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"3000.0000","create_time":"2020-04-01 23:24:15","investment_base_money":"30000.0000","currency_id":1},{"currency_name":"USDT","investment_money":"3000.0000","create_time":"2020-04-01 23:24:03","investment_base_money":"30000.0000","currency_id":1}]}
    return new Promise((resolve, reject) => {
        resolve(res)
    })
}

export function awardRecordList({ page, pagesize, award_id }) {
    // return request({
    //     url: 'api/award/awardRecordList',
    //     method: 'get',
    //     params: { page, pagesize, award_id }
    // })
    var res = {"errcode":0,"msg":"","res":{"data":[{"currency_name":"JYB","money":"3000.0000","remark":"会员CAGI827031创投,获得分销奖励","create_time":"2020-04-01 23:17:17","award_id":1,"award_name":"静态分红奖励"},{"currency_name":"JYB","money":"633.9125","remark":"会员CAGI307464创投,获得分销奖励","create_time":"2020-04-01 23:11:09","award_id":1,"award_name":"静态分红奖励"}],"count":2,"page":"1","pagesize":"6"}}
    
    return new Promise((resolve, reject) => {
        resolve(res)
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

