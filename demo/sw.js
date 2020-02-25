self.addEventListener('install', event => {
  self.skipWaiting()
})
self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async function() {
        const page = /\.html/.test(event.request.url) ? event.request.url.replace(/.+\/(.+)\.html.*/, '$1') : 'index'
        const inMp = event.request.url.indexOf('_c=mp') > -1
        let mpScript = ''
        if (inMp) {
          mpScript = `<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js" defer="defer"></script>`
        }
        const appInfo = { hash: '__APP_PAGES_HASH_MAP_PLACEHOLDER__'}
        const html = `<!doctype html>
              <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
                      <meta name="mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <script src="common.${appInfo.hash.common}.bundle.js" defer="defer"></script>
                      <script src="${page}.${appInfo.hash[page]}.bundle.js" defer="defer"></script>
                      ${mpScript}
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
