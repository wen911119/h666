Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    status: 'loading'
  },

  webLoaded: function() {
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
  onLoad: function(routeParams) {
    const h666Config = getApp().globalData.h666
    const {
      _p,
      page = h666Config.home.name,
      host = h666Config.host
    } = routeParams
    let config = h666Config.home.headerConfig
    this.page = page
    if (routeParams.headerConfig) {
      try {
        config = JSON.parse(decodeURIComponent(routeParams.headerConfig))
      } catch (err) {
        config = {}
        wx.reportAnalytics('route-params-parse-error', {
          error: JSON.stringify(err),
          page
        })
      }
    }
    const { title, titleColor, bgColor } = config
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
    const url = `${host}/wechat.html?_c=mp&_v=${h666Config.version}#_p=${_p}&depth=1&page=${page}`
    const self = this
    self.setData({ url: url, status: 'ok' }, function() {
      // webview开始正式加载
      self.webStartAt = Date.now()
    })
    // 小程序加载完成
    // self.mpDoneAt = Date.now()
    // wx.request({
    //   url: url,
    //   success: function(ret) {
    //     // webview预加载完成
    //     self.setData({ url: url, status: 'ok' }, function() {
    //       // webview开始正式加载
    //       self.webStartAt = Date.now()
    //     })
    //   },
    //   fail: function(error) {
    //     // 显示错误页
    //     self.setData({ status: 'err' }, function() {
    //       // 启动预加载报错上报
    //       wx.reportAnalytics('pre-load-error', {
    //         error: JSON.stringify(error),
    //         page
    //       })
    //     })
    //   }
    // })
  },

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

  onPop: function(params) {
    this.setData({
      url:
        this.data.url.replace(/onPopParams=.*&/, '').replace(/&onPopParams=.*$/, '') +
        '&onPopParams=' +
        encodeURIComponent(JSON.stringify(params || {}))
    })
  },

  onBack: function(params) {
    this.setData({
      url:
      this.data.url.replace(/onBackParams=.*&/, '').replace(/&onBackParams=.*$/, '') +
        '&onBackParams=' +
        encodeURIComponent(JSON.stringify(params || {}))
    })
  },

  onMessage: function(event) {
    if (event.detail.data && event.detail.data[0]) {
      var message = event.detail.data[0]
      var pages = getCurrentPages()
      if (message.type === 'pop-params') {
        var lastPage = pages[pages.length - 2]
        lastPage && lastPage.onPop && lastPage.onPop(message.params)
      } else if ((message.type = 'back-params')) {
        var targetPage = pages[pages.length - message.steps - 1]
        targetPage && targetPage.onBack && targetPage.onBack(message.params)
      }
    }
  }
})
