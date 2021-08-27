import request from '@src/utility/request'

// 汇款配置
export function configRemittanceList() {
    return request({
        url: 'api/remittance/configRemittanceList',
        method: 'get'
    })
    // var res = {"errcode":0,"msg":"success","res":{"id":1,"currency_id":1,"target_currency_id":2,"cardinal_number":1,"min":1,"max":10000,"is_show":1,"is_del":0,"address":"0xa75e7211d3c61d262cd3f249f74a7b1c39543fc6","name":"USDT","rate":100}}
    // return new Promise((resolve, reject) => {
    //     resolve(res.res)
    // })

}

// 汇款
export function remittanceCommit(data) {
    return request({
        url: 'api/remittance/remittanceCommit',
        method: 'post',
        data
    })
}

// 汇款记录
export function remittanceRecordList() {
    return request({
        url: 'api/remittance/remittanceRecordList',
        method: 'get'
    })

    // var res = {"errcode":0,"msg":"","res":[{"create_time":"2021-08-19 18:40:26","reality_money":"10.00","address":"0xa75e7211d3c61d262cd3f249f74a7b1c39543fc6","status":0},{"create_time":"2021-08-19 17:04:51","reality_money":"10.00","address":"0xa75e7211d3c61d262cd3f249f74a7b1c39543fc6","status":0},{"create_time":"2021-08-09 11:09:10","reality_money":"10.00","address":"0xa75e7211d3c61d262cd3f249f74a7b1c39543fc6","status":0}]}
    // return new Promise((resolve, reject) => {
    //     resolve(res.res)
    // })
}

// 提现配置
export function configDrawList() {
    return request({
        url: 'api/draw/configDrawList',
        method: 'get'
    })
}

// 提现
export function drawCommit(data) {
    return request({
        url: 'api/draw/drawCommit',
        method: 'post',
        data
    })
}

// 提现记录 0=审核中,1=已成功
export function drawRecordList({ status }) {
    return request({
        url: 'api/draw/drawRecordList',
        method: 'get',
        params: { status }
    })
}

// 兑换配置列表
export function configConvertList() {
    return request({
        url: 'api/convert/configConvertList',
        method: 'get'
    })
    // var res = {"errcode":0,"msg":"","res":[{"id":5,"currency_id":2,"target_currency_id":3,"cardinal_number":1,"min":1,"max":10000,"rate":"0.00","is_show":1,"is_del":0,"currency_name":"JYB","currency_rate":10,"target_currency_name":"TBAU","target_currency_rate":100,"account":"3.0000"},{"id":6,"currency_id":2,"target_currency_id":4,"cardinal_number":1,"min":1,"max":10000,"rate":"0.00","is_show":1,"is_del":0,"currency_name":"JYB","currency_rate":10,"target_currency_name":"PSBAU","target_currency_rate":100,"account":"3.0000"},{"id":1,"currency_id":3,"target_currency_id":1,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"currency_name":"TBAU","currency_rate":100,"target_currency_name":"USDT","target_currency_rate":100,"account":0},{"id":7,"currency_id":3,"target_currency_id":4,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"currency_name":"TBAU","currency_rate":100,"target_currency_name":"PSBAU","target_currency_rate":100,"account":0},{"id":4,"currency_id":4,"target_currency_id":1,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"currency_name":"PSBAU","currency_rate":100,"target_currency_name":"USDT","target_currency_rate":100,"account":0},{"id":8,"currency_id":4,"target_currency_id":3,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"currency_name":"PSBAU","currency_rate":100,"target_currency_name":"TBAU","target_currency_rate":100,"account":0}]}
    // return new Promise((resolve, reject) => {
    //     resolve(res.res)
    // })

}

// 兑换
export function convertCommit({ convert_id, money, pay_password }) {
    return request({
        url: 'api/convert/convertCommit',
        method: 'post',
        data: { convert_id, money, pay_password }
    })
}

// 兑换记录
export function convertRecordList() {
    return request({
        url: 'api/convert/convertRecordList',
        method: 'get'
    })
}

// 转账配置列表
export function configTransferList() {
    return request({
        url: 'api/transfer/configTransferList',
        method: 'get'
    })
    // var res = {"errcode":0,"msg":"success","res":[{"id":1,"currency_id":1,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"name":"USDT"},{"id":2,"currency_id":2,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"name":"JYB"},{"id":3,"currency_id":3,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"name":"TBAU"},{"id":4,"currency_id":4,"cardinal_number":1,"min":1,"max":10000,"rate":"1.00","is_show":1,"is_del":0,"name":"PSBAU"}]}
    // return new Promise((resolve, reject) => {
    //     resolve(res.res)
    // })
}

// 转账
export function transferCommit(data) {
    return request({
        url: 'api/transfer/transferCommit',
        method: 'post',
        data
    })
    // var res = {"errcode":4000,"msg":"支付密码输入错误"}
    // return new Promise((resolve, reject) => {
    //     resolve(res)
    // })
}

// 转账记录 类型：1=转入,2=转出
export function transferRecordList({ type }) {
    return request({
        url: 'api/transfer/transferRecordList',
        method: 'get',
        params: { type }
    })
}

// 账户余额
export function userAccount() {
    return request({
        url: 'api/account/userAccount',
        method: 'get'
    })
    // var res = {"errcode":0,"msg":"","res":{"1":"81300.0000","2":"3.0000","3":"0.0000","4":"0.0000","5":"408100.0000"}}
    // return new Promise((resolve, reject) => {
    //     resolve(res)
    // })

}

// 财务明细 类型：0=全部，1=usdt
export function billList({ currency_id, page, pagesize }) {
    return request({
        url: 'api/bill/billList',
        method: 'get',
        params: { currency_id, page, pagesize }
    })
    // var res = {"errcode":0,"msg":"","res":{"data":[{"bill_type":"投资套餐","account":"1500.0000","after_account":"81300.0000","remark":"会员投资套餐,账户扣款","create_time":"2021-08-12 11:39:08","type":2,"currency_name":"USDT"},{"bill_type":"点击宝箱","account":"1.0000","after_account":"3.0000","remark":"会员点击宝箱,获取奖励","create_time":"2021-08-11 16:02:22","type":1,"currency_name":"JYB"},{"bill_type":"投资套餐","account":"10000.0000","after_account":"82800.0000","remark":"会员投资套餐,账户扣款","create_time":"2021-08-09 11:08:09","type":2,"currency_name":"USDT"},{"bill_type":"投资套餐","account":"300.0000","after_account":"92800.0000","remark":"会员投资套餐,账户扣款","create_time":"2021-08-06 15:37:34","type":2,"currency_name":"USDT"},{"bill_type":"投资套餐","account":"300.0000","after_account":"93100.0000","remark":"会员投资套餐,账户扣款","create_time":"2021-08-06 15:37:30","type":2,"currency_name":"USDT"},{"bill_type":"投资套餐","account":"300.0000","after_account":"93400.0000","remark":"会员投资套餐,账户扣款","create_time":"2021-08-06 15:37:29","type":2,"currency_name":"USDT"}],"count":12,"page":"1","pagesize":"6"}}

    // return new Promise((resolve, reject) => {
    //     resolve(res.res)
    // })
}
