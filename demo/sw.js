self.addEventListener('install', event => {
  self.skipWaiting()
})
self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' && /\.html/.test(event.request.url)) {
    event.respondWith(
      (async function() {
        const page = event.request.url.replace(/.+\/(.+)\.html.*/, '$1')
        const appInfo = {
          version: 1582623213313,
          hash: {
            actionsheetDemo: '869a100085436ae24cb1',
            analytics: '6fc634496b4aea3e244e',
            autolistDemo: 'a2d9cfac7abac9b935c0',
            buttonDemo: '3accb74c00ded8327da7',
            common: 'b7c600a44f9e070ef54c',
            countdownDemo: 'f22afafa94d669a2844d',
            dateRangePickerDemo: '3d5d918e5e80efc70dc4',
            dialogDemo: '962a6155ad0d8503af11',
            errorLog: 'd2acfda901ebc630ec00',
            formDemo: '7ebb7fa374620a76b8c7',
            iconDemo: 'd6765fcee44a7169816e',
            imageDemo: 'e0468e2e548dca194600',
            imagePreviewDemo: '3dfd2580b0a08c9ed4f7',
            imageUploaderDemo: '69c1f16b71de83ebceef',
            index: '7f7d83cb05e1d00cb2b0',
            indicatorDemo: '4912ac845cc47d85753e',
            inputDemo: '4e1de7f8e83b43106db1',
            layoutDemo: '17766661fe794b43bcc4',
            lineDemo: '11048e2c4ad3012f1648',
            loadingDemo: 'cfd546e8afff87414ffd',
            modalDemo: '2e4f74b0735403e9ae1c',
            navDemo: 'eff9bd674a79dd1e28d9',
            navDemo2: 'efd632221e347f44d4d8',
            navDemo3: 'a93fd13dd567afd5e00f',
            pickerDemo: '993a7a398f0376d3dc2e',
            scrollerDemo: '2053bf161bd9204a5035',
            searchPickerDemo: '13dc32ee76bcdf4af9c2',
            swiperDemo: '300d1be1f5c157c455ba',
            switchDemo: '0a99773052bd7683e472',
            tabbarDemo: '5f1ff5acd9302310aee6',
            tabsDemo: 'def3eda2bcd4680bd98a',
            textDemo: 'cb746cf0fa069c825d49',
            timing: '3eb4ca12d8c7005ccb95',
            treepickerDemo: '364d87facfe204170295'
          }
        }
        const pageTitleMap = {
          index: 'h666解决方案演示',
          list: '列表页',
          buttonDemo: 'button示例',
          actionsheetDemo: 'actionsheet演示',
          dialogDemo: 'dialog示例',
          modalDemo: '模态框演示',
          swiperDemo: '轮播图演示',
          tabsDemo: 'tabs演示',
          formDemo: '表单演示页面',
          switchDemo: '开关组件演示',
          treepickerDemo: '多级选择器演示',
          scrollerDemo: '滚动组件演示',
          autolistDemo: '自动列表演示',
          imageUploaderDemo: '图片上传组件演示',
          searchPicker: '搜索picker',
          tabbarDemo: 'tabbar演示',
          pickerDemo: '选择器演示',
          textDemo: '文本组件演示',
          layoutDemo: '布局套件演示',
          imageDemo: '图片组件演示',
          iconDemo: '图标组件演示',
          imagePreviewDemo: '图片预览api演示',
          inputDemo: '输入框组件演示',
          lineDemo: '线条组件演示',
          countdownDemo: '倒计时组件演示',
          loadingDemo: '加载组件演示',
          navDemo: '路由演示',
          navDemo2: '路由演示2',
          navDemo3: '路由演示3',
          analytics: '访问信息',
          timing: '加载性能',
          errorLog: '错误日志',
          indicatorDemo: '指示器演示',
          redundantPage1: 'redundant1',
          redundantPage2: 'redundant2',
          redundantPage3: 'redundant3',
          dateRangePickerDemo: '日期区间选择器'
        }
        const html = `<!doctype html>
              <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
                      <meta name="mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <title>${pageTitleMap[page]}</title>
                      <script>
                          // hack for bfcache
                          window.MessageChannel = null;
                      </script>
                      <script src="common.${appInfo.hash.common}.bundle.js" defer="defer"></script>
                      <script src="${page}.${appInfo.hash[page]}.bundle.js" defer="defer"></script>
                      <style>
                          html {
                              font-size: 37.5px;
                              font-size: 10vw;
                              -webkit-overflow-scrolling: touch;
                          }
              
                          html, body {
                              margin: 0;
                              padding: 0;
                              height: 100%;
                              background-color: #F4F5F6;
                          }
              
                          * {
                              -webkit-tap-highlight-color: transparent;
                              box-sizing: border-box;
                          }
              
                          *:not(input) {
                              -webkit-user-select: none;
                          }
              
                          .flex1 {
                              -webkit-box-flex: 1;
                              -webkit-flex: 1;
                              flex: 1;
                          }
              
                          .loading {
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                          }
              
                          .loading > i {
                              position: absolute;
                              left: -20px;
                              top: -20px;
                              border: 2px solid #22d7bb;
                              border-bottom-color: transparent;
                              border-top-color: transparent;
                              border-radius: 100%;
                              height: 35px;
                              width: 35px;
                              -webkit-animation: rotate 1s 0s ease-in-out infinite;
                              animation: rotate 1s 0s ease-in-out infinite;
                          }
              
                          .loading > i:last-child {
                              display: inline-block;
                              top: -10px;
                              left: -10px;
                              width: 15px;
                              height: 15px;
                              -webkit-animation-duration: 0.5s;
                              animation-duration: 0.5s;
                              border-color: #22d7bb transparent;
                              -webkit-animation-direction: reverse;
                              animation-direction: reverse;
                          }
              
                          @keyframes rotate {
                              0% {
                                  -webkit-transform: rotate(0) scale(1);
                                  transform: rotate(0) scale(1);
                              }
              
                              50% {
                                  -webkit-transform: rotate(180deg) scale(0.6);
                                  transform: rotate(180deg) scale(0.6);
                              }
              
                              100% {
                                  -webkit-transform: rotate(360deg) scale(1);
                                  transform: rotate(360deg) scale(1);
                              }
                          }
                      </style>
                  </head>
                  <body>
                      <div>
                          <i class="loading">
                              <i></i>
                              <i></i>
                          </i>
                      </div>
                  </body>
              </html>
              `
        return new Response(html, {
          headers: {
            'content-type': 'text/html; charset=utf-8'
          }
        })
      })()
    )
  }
})
