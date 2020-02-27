// 正式发布时换成正式域名
// const host = 'https://demo.example.com'
const host = 'http://192.168.31.156:3000'

App({
  globalData: {
    h666: {
      host,
      home: {
        name: 'index',
        headerConfig: {
          title: 'h666解决方案模版'
        }
      },
      version: '9527'
    }
  }
})