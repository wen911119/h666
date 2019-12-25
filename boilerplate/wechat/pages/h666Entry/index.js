// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    status: 'loading'
  },

  webLoaded: function () {
    this.webDoneAt = Date.now()
    // 启动性能数据上报
    wx.reportAnalytics('init-time', {
      mpLoading: this.webStartAt - this.mpDoneAt,
      empty: this.webDoneAt - this.webStartAt,
      page: this.page
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (routeParams) {
    const h666Config = getApp().globalData.h666
    const {_p, page = h666Config.home.name, host = h666Config.host } = routeParams
    this.page = page
    let config = routeParams.headerConfig
    if (config) {
      try {
        config = JSON.parse(decodeURI(config))
      }catch(err){
        config = {}
        wx.reportAnalytics('route-params-parse-error', {
          error: JSON.stringify(err),
          page
        })
      }
      const { title, titleColor, bgColor} = config
      if (title) {
        wx.setNavigationBarTitle({
          title
        })
      }
      if (bgColor) {
        wx.setNavigationBarColor({
          frontColor: titleColor || '#ffffff',
          backgroundColor: bgColor
        })
      }
    }
    const url = `${host}/${page}.html?_c=mp&ts=${Date.now()}&_p=${_p}`
    const self = this
    // 小程序加载完成
    self.mpDoneAt = Date.now()
    wx.request({
      url: url,
      success: function (ret) {
        // webview预加载完成
        self.setData({ url: url, status: 'ok' }, function () {
          // webview开始正式加载
          self.webStartAt = Date.now()
        })
      },
      fail: function (error) {
        // 显示错误页
        self.setData({ status: 'err' }, function () {
          // 启动预加载报错上报
          wx.reportAnalytics('pre-load-error', {
            error: JSON.stringify(error),
            page
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})