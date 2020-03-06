const host = 'https://h666-demo.ruiyun2015.com'
// const host = 'http://192.168.1.8:3000'
// let appVersion = Date.now()

// const localVersion = wx.getStorageSync('H666_APP_VERSION')
// if (localVersion) {
//   appVersion = localVersion
// }

App({
  globalData: {
    h666: {
      host,
      home: {
        name: 'index',
        headerConfig: {
          title: 'h666解决方案演示'
        }
      },
      version: '9527'
    }
  }
})