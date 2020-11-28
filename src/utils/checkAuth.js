import wx from '@/utils/wx'
import { StoreToken } from '@/utils/wxstore'

import Dialog from '../../static/vant/dialog/dialog'

export const checkSession = async () => {
  try {
    await wx.checkSession()
    return true
  } catch (e) {
    return false
  }
}

export const confirmAuth = () => {
  Dialog.confirm({ title: '未登录', message: '确定登录吗？' })
    .then(() => {
      // 确定登录
      wx.navigateTo({ url: '/pages/auth' })
    })
    .catch(() => {})
}

export const checkAuth = async () => {
  const token = await StoreToken.get()
  if (token) {
    const flag = await checkSession()
    if (flag) {
      return true
    }
  }
  return false
}