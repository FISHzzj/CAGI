import axios from 'axios'
import { Toast } from 'antd-mobile'
import { createHashHistory } from 'history';

const service = axios.create({
    baseURL: '/public/index.php/',
    withCredentials: true,
    timeout: 15000
})

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data


        Toast.hide();
        if (res.errcode === 4001) {
            Toast.info(res.msg || '系统异常，请稍后重试', 2);
            localStorage.removeItem('token')
            localStorage.removeItem('member')
            createHashHistory().push('/login');

            return Promise.reject(res)
        }

        if (res.errcode !== 0) {
            Toast.info(res.msg || '错误', 2, null, false)
            return Promise.reject(res)
        }

        return res.res
    },
    error => {
        Toast.info('系统异常，请稍后重试！', 2, null, false);
        return Promise.reject(error)
    }
)

export default service




























// import axios, { AxiosRequestConfig, Method } from 'axios'
// import apiConfig from '@api/config'
// import { Toast } from 'antd-mobile'

// import { getHttpStatusText } from './status'

// axios.defaults.baseURL = apiConfig.baseURL //默認全局域名

// /**
//  * 接口返回类型 (根据后端返回的格式定义)
//  * @interface ResponseType
//  */
// //  export interface ResponseType<T> {
// //     data: T
// //     msg: string
// //     code: number
// //   }

// const TIMEOUT = 5000
// const TOAST_DURATION = 2
// const initAxios = (loading) => {
//     /* 创建一个axios实例 */
//     const AxiosInstance = axios.create({
//       baseURL: apiConfig.baseURL,
//       timeout: TIMEOUT,
//       withCredentials: false
//     })
  
//     // request interceptor
//     AxiosInstance.interceptors.request.use(config => {
//       if (loading) Toast.loading('加载中')
//       // 使用自定义loading
//       // if (loading) Toast.loading(LoadingElement, TIMEOUT)
//       // 自定义headers
//       config.headers = {
//         'Content-Type': 'application/json',
//         'token': 'C8046270986100661628062709'
//       }
//       return config
//     })
  
//     // response interceptor
//     AxiosInstance.interceptors.response.use(
//       response => {
//         Toast.hide()
//         if (response && response.status && response.status !== 200) {
//           Toast.info(getHttpStatusText(response.status), TOAST_DURATION)
//           return Promise.reject(response || 'error')
//         } else {
//           return Promise.resolve(response)
//         }
//       },
//       error => {
//         Toast.hide()
//         Toast.info(getHttpStatusText(null, error), TOAST_DURATION)
//         return Promise.reject(error)
//       }
//     )
  
//     return AxiosInstance
//   }

// /**
//  * 封装request
//  *
//  * @param {string} url
//  * @param {Method} method
//  * @param {*} [data]
//  * @param {boolean} [loading]
//  * @returns {Promise<ResponseType>}
//  */
//  export default function request({url, method, data = {}, loading}) {
//     console.log(url)
//     console.log(method) 
//     /* 请求公共参数配置 */
//     const publicParams = {
//     //   env: envConfig.ENV_TYPE,
//     //   mockType: 1,
//     //   source: 'h5'
//     }
//     // 合并公共参数
//     data = Object.assign({}, data, publicParams)
//     const options = {
//       url,
//       method,
//       params: method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE' ? data : null,
//       data: method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' ? data : null
//     }
  
//     const AxiosInstance = initAxios(loading)
//     return new Promise((resolve, reject) => {
//       AxiosInstance(options)
//         .then(res => {
//           const data = res 
//           // 这里可以添加和后台的 status 约定
//           if (data.errcode !== 0) {
//             Toast.info(data.msg)
//           }
//           resolve(data.res)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//   }