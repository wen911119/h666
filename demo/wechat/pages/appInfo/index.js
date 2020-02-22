// pages/appInfo/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    version: wx.getStorageSync('H666_APP_VERSION'),
    versionFormat: '无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.version) {
      const t = new Date(this.data.version)
      this.setData({
        versionFormat:
          t.getFullYear() +
          '-' +
          (t.getMonth() + 1) +
          '-' +
          t.getDate() +
          ' ' +
          t.getHours() +
          ':' +
          t.getMinutes() +
          ':' +
          t.getSeconds()
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onfetchAppInfo: function() {
    const self = this
    const host = getApp().globalData.h666.host
    if (host.includes('https')) {
      wx.request({
        url: host + '/app.json',
        data: {
          ts: Date.now()
        },
        success(res) {
          if (res && res.data) {
            const v = res.data.version
            if (v !== self.data.version) {
              wx.setStorage({
                key: 'H666_APP_VERSION',
                data: v,
                success: function() {
                  wx.showModal({
                    title: '更新',
                    content: '有新的更新可用，需要重新启动小程序以应用更新',
                    showCancel: true,
                    cancelText: '下次再说',
                    confirmText: '现在重启',
                    success: function(res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: 'pages/h666Container1/index'
                        })
                      }
                    }
                  })
                }
              })
            } else {
              wx.showToast({
                title: '已经是最新版本'
              })
            }
          }
        }
      })
    }
  }
})
