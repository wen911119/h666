process.env.BUILD_TARGET = 'local'
const fse = require('fs-extra')
const webpack = require('webpack')
let webpackConfig = require('../webpack/config')
const WebpackDevServer = require('webpack-dev-server')
const ip = require('ip')
module.exports = function (port) {
  webpackConfig.mode = 'development'
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  const compiler = webpack(webpackConfig)
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    }
  })

  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(port, ip.address(), () => {
    console.log(`Starting server on http://${ip.address()}:${port}`)
  })
  // 改小程序的endpoint
  const wechatAppJsPath = process.cwd() + '/wechat/app.js'
  let content = fse.readFileSync(wechatAppJsPath, 'utf8')
  content = content.replace(/\d+\.\d+\.\d+\.\d+:\d+/, `${ip.address()}:${port}`)
  fse.writeFile(wechatAppJsPath, content, 'utf8')
}
