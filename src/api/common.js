import request from '@src/utility/request'

export function fileUpload(data) {
    return request({
        url: 'api/upload/fileUpload',
        method: 'post',
        data
    })
}
