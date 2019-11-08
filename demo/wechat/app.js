// app.js
App({
  globalData: {
    host: 'http://10.100.1.165:3000'
    // host: 'https://h666-demo.ruiyun2015.com'
  },
  onLaunch(options) {
    // Do something initial when launch.
    console.log(options)
    wx.cloud.init()
    wx.cloud.callFunction({
      // 云函数名称
      name: 'openid',
      success: function (res) {
        console.log(res.result) // 3
      },
      fail: console.error
    })
  }
})
