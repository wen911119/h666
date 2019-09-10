import { setIconFontUrl } from '@ruiyun/preact-icon'
export default function onEntry () {
  // 下面的代码每个页面初始化时都会执行
  setIconFontUrl('//at.alicdn.com/t/font_1401630_unif3299sk9.css')
}
