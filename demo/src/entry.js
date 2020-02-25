import { setIconFontUrl } from '@ruiyun/preact-icon'
export default function onEntry() {
  // 下面的代码每个页面初始化时都会执行
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
  setIconFontUrl('https://at.alicdn.com/t/font_1401630_2vgk76dau2a.css')
}
