import request from '@src/utility/request'

// 汇款配置
export function configRemittanceList() {
    return request({
        url: 'api/remittance/configRemittanceList',
        method: 'get'
    })
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
}

// 转账
export function transferCommit(data) {
    return request({
        url: 'api/transfer/transferCommit',
        method: 'post',
        data
    })
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
    // return request({
    //     url: 'api/account/userAccount',
    //     method: 'get'
    // })
    var res = {"errcode":0,"msg":"","res":{"1":"81300.0000","2":"3.0000","3":"0.0000","4":"0.0000","5":"408100.0000"}}
    return new Promise((resolve, reject) => {
        resolve(res)
    })

}

// 财务明细 类型：0=全部，1=usdt
export function billList({ currency_id, page, pagesize }) {
    return request({
        url: 'api/bill/billList',
        method: 'get',
        params: { currency_id, page, pagesize }
    })
}
