const host = 'https://h666-demo.ruiyun2015.com'
// const host = 'http://192.168.31.156:3000'
let appVersion = Date.now()

const localVersion = wx.getStorageSync('H666_APP_VERSION')
if (localVersion) {
  appVersion = localVersion
}

App({
  globalData: {
    h666: {
      host,
      home: {
        name: 'index',
        headerConfig: {
          title: '首页'
        }
      },
      version: appVersion
    }
  }
})

if (host.includes('https')) {
  // 非本地时启用
  // 异步更新，下一次启动时生效
  wx.request({
    url: host + '/app.json',
    data: {
      ts: Date.now()
    },
    success(res) {
      if (res && res.data) {
        const remoteVersion = res.data.version
        if (localVersion !== remoteVersion) {
          wx.setStorage({
            key: 'H666_APP_VERSION',
            data: remoteVersion,
          })
          getApp().globalData.h666.version = remoteVersion
        }
      }
    }
  })
}