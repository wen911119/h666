self.addEventListener('fetch', function(event) {
  event.respondWith(async function () {
    if (/\.html/.test(event.request.url)) {
      const page = event.request.url.replace(/.+\/(.+)\.html.*/, '$1')
      const appInfo = {"version":1582600270729,"hash":{"actionsheetDemo":"12f6175794779835db65","analytics":"fb26d11500e0526576c4","autolistDemo":"365d0948e670606726ca","buttonDemo":"2a19fa7f0a82611ac966","common":"60c0006a31b8f2be4f8e","countdownDemo":"53afa51833575d3fa489","dateRangePickerDemo":"8ed86cc15e8a663dfab4","dialogDemo":"a39163f2a5116b263efa","errorLog":"197a39170ada72105b81","formDemo":"1080a6b14ffc7e644977","iconDemo":"355d0dd5aaa58b9dbaec","imageDemo":"1581b4fddda6c41f5715","imagePreviewDemo":"a213fa95f495a125f489","imageUploaderDemo":"659335fbd2715214681b","index":"c4bd883f22cff993a918","indicatorDemo":"6364908776b79340d1cd","inputDemo":"02506051bba68bd9707b","layoutDemo":"da09dbedfcc9d3104034","lineDemo":"7e1c4b801ec435373d51","loadingDemo":"d3ec1b5b13fa9fb9e56a","modalDemo":"4eb264ca872a7cad1e69","navDemo":"a9075e4f2b4cf38248a4","navDemo2":"ebad6112c85fd6d516a4","navDemo3":"6556c647df1a3c3c7f8e","pickerDemo":"7bbd50b1f2ff4be60b3f","scrollerDemo":"9c38f6fbcbbcc56cb5c4","searchPickerDemo":"38e0ba172219cde95c32","swiperDemo":"cc5736af3a1e8737077e","switchDemo":"ff5387160b5aa2b3cd31","tabbarDemo":"7b7bb1be21cbab499e89","tabsDemo":"9cb69917cd58c490df82","textDemo":"77984f99c35e12733436","timing":"d45b124ba95a255d24e1","treepickerDemo":"b5f04490c74a27f6e4f8"}}
      const pageTitleMap = {
        "index": "h666解决方案演示",
        "list": "列表页",
        "buttonDemo": "button示例",
        "actionsheetDemo": "actionsheet演示",
        "dialogDemo": "dialog示例",
        "modalDemo": "模态框演示",
        "swiperDemo": "轮播图演示",
        "tabsDemo": "tabs演示",
        "formDemo": "表单演示页面",
        "switchDemo": "开关组件演示",
        "treepickerDemo": "多级选择器演示",
        "scrollerDemo": "滚动组件演示",
        "autolistDemo": "自动列表演示",
        "imageUploaderDemo": "图片上传组件演示",
        "searchPicker": "搜索picker",
        "tabbarDemo": "tabbar演示",
        "pickerDemo": "选择器演示",
        "textDemo": "文本组件演示",
        "layoutDemo": "布局套件演示",
        "imageDemo": "图片组件演示",
        "iconDemo": "图标组件演示",
        "imagePreviewDemo": "图片预览api演示",
        "inputDemo": "输入框组件演示",
        "lineDemo": "线条组件演示",
        "countdownDemo": "倒计时组件演示",
        "loadingDemo": "加载组件演示",
        "navDemo": "路由演示",
        "navDemo2": "路由演示2",
        "navDemo3": "路由演示3",
        "analytics": "访问信息",
        "timing": "加载性能",
        "errorLog": "错误日志",
        "indicatorDemo": "指示器演示",
        "redundantPage1": "redundant1",
        "redundantPage2": "redundant2",
        "redundantPage3": "redundant3",
        "dateRangePickerDemo": "日期区间选择器"
      }
      const html = `<!doctype html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
              <meta name="mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-capable" content="yes">
              <title>${pageTitleMap[page]}</title>
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
              <script>
                  // hack for bfcache
                  window.MessageChannel = null;
              </script>
              <script src="common.${appInfo.hash.common}.bundle.js" defer="defer"></script>
              <script src="${page}.${appInfo.hash[page]}.bundle.js" defer="defer"></script>
          </body>
      </html>
      `
      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8'
        }
      });
    } else {
      return fetch(event.request);
    }
  }());
});