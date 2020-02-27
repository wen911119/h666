function pushToH666(path, params, headerConfig) {
  var _p = {
    params: params || {}
  }
  wx.navigateTo({
    url: '/pages/h666Container' + (getCurrentPages().length + 1) + '/index?page=' + path + '&headerConfig=' + encodeURIComponent(JSON.stringify(headerConfig || {})) + '&_p=' + encodeURIComponent(JSON.stringify(_p)),
  })
}

function replaceToH666(path, params, headerConfig) {
  var _p = {
    params: params || {}
  }
  wx.redirectTo({
    url: '/pages/h666Container' + (getCurrentPages().length) + '/index?page=' + path + '&headerConfig=' + encodeURIComponent(JSON.stringify(headerConfig || {})) + '&_p=' + encodeURIComponent(JSON.stringify(_p)),
  })
}

function popToH666(params) {
  var pages = getCurrentPages()
  var lastPage = pages[pages.length - 2]
  lastPage && lastPage.onPop && lastPage.onPop(params)
  wx.navigateBack()
}

function backToH666(steps, params) {
  var pages = getCurrentPages()
  var targetPage = pages[pages.length - steps - 1]
  targetPage && targetPage.onBack && targetPage.onBack(params)
  wx.navigateBack({
    delta: steps
  })
}

exports.pushToH666 = pushToH666
exports.replaceToH666 = replaceToH666
exports.popToH666 = popToH666
exports.backToH666 = backToH666