import {StoreToken} from './wxstore'
import config from'./config/index'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? config.baseUrl.dev
    : config.baseUrl.pro
    
const pending ={}
const isHttpSuccess=(status)=>{
    return status >=200 && status<300
}

const errorHandle=(res)=>{
    console.log(res)
    wx.showToast({
        title:res.msg?res.msg:'请求异常',
        type:'none',
        duration:2000
    })
}

export const request = async (options = {}) => {
    // 考虑与微信的接口进行兼容
    const { success, fail } = options
    const key = options.url + '&' + (options.method || 'GET')
    let isPublic = false
    config.publicPath.map((path) => {
      isPublic = isPublic || path.test(options.url)
    })
    // 注意处理storeToken为空的情况
    const token = await StoreToken.get()
    let header = {}
    if (!isPublic && token) {
      header = Object.assign(
        {
          Authorization: 'Bearer ' + token
        },
        options.header
      )
    }
    console.log('url'+options.url)
    options.url = baseUrl + options.url
    const result = new Promise((resolve, reject) => {
      wx.showLoading()
      const handler = wx.request(
        Object.assign({}, options, {
          header,
          success: (res) => {
            // 避免重复请求
            delete pending[key]
            // 请求成功http Status状态码判断
            // '200' -> startWith('2')
            if (isHttpSuccess(res.statusCode)) {
              if (success) {
                success(res.data)
                return
              }
              resolve(res.data)
            } else {
              errorHandle(res)
              reject(res)
            }
          },
          fail: (err) => {
            delete pending[key]
            errorHandle(err)
            if (fail) {
              fail(err)
              return
            }
            reject(err)
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      )
      if (pending[key]) {
        pending[key].abort()
      }
      setTimeout(() => {
        pending[key] = handler
      }, 0)
    })
    return result
  }
  export const axios = {
    get (url,data) {
      return request({
        url,
        data: 'json',
        method: 'GET',

      })
    },
    post (url, data) {
      return request({
        url,
        data,
        method: 'POST',
        ...options
      })
    }
  }