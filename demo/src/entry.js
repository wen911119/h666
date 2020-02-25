import { setIconFontUrl } from '@ruiyun/preact-icon'
import Indicator from 'h5-indicator'

export default function onEntry() {
  // 下面的代码每个页面初始化时都会执行
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if ('serviceWorker' in navigator && !isIOS) {
    Indicator.toast('service worker ok')
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('service worker 注册完成', registration);
      }, function(err) {
        console.log('注册失败', err);
      });
    });
  }
  setIconFontUrl('https://at.alicdn.com/t/font_1401630_2vgk76dau2a.css')
}
