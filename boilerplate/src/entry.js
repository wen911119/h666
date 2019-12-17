import { setIconFontUrl } from '@ruiyun/preact-icon'
import Indicator from 'h5-indicator'
import {
  setDefaultErrorHander,
  setLoadingMethod,
  setOnRequestHandler
} from '@ruiyun/ajax'
import { nav } from '@ruiyun/preact-m-nav'
import { TOKEN_KEY } from './constants/other'

export default function onEntry() {
  // 下面的代码每个页面初始化时都会执行
  setIconFontUrl('https://at.alicdn.com/t/font_1537410_hgs8977vara.css')
  // 下面的代码每个页面初始化时都会执行.
  setLoadingMethod({
    show: Indicator.showLoading,
    hide: Indicator.hideLoading
  })
  setDefaultErrorHander(error => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        // 未授权
        // 删除本地无效token
        window.localStorage.setItem(TOKEN_KEY, '')
        Indicator.toast('授权过期')
        // 跳转登录页面
        nav.replace('login')
      } else if (status < 500) {
        Indicator.toast(error.response.data.message)
      } else {
        Indicator.toast('服务异常,请稍后再试')
      }
    } else {
      Indicator.toast('网络异常')
    }
  })
  setOnRequestHandler(config => {
    const token = window.localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.token = token
    }
  })
}
