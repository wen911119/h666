process.env.BUILD_TARGET = 'local'
const fse = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('../webpack/config')
const WebpackDevServer = require('webpack-dev-server')
const ip = require('ip')
module.exports = function (port) {
  process.env.DEBUG = true
  webpackConfig.mode = 'development'
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  webpackConfig.output.filename = '[name].bundle.js'
  const compiler = webpack(webpackConfig)
  const devServerOptions = {
    host: ip.address(),
    hot: true,
    stats: {
      colors: true
    }
  }

  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(port, '0.0.0.0', () => {
    console.log(`Starting server on http://${ip.address()}:${port} or localhost:${port}`)
  })
  // 改小程序的endpoint
  const wechatAppJsPath = process.cwd() + '/wechat/app.js'
  let content = fse.readFileSync(wechatAppJsPath, 'utf8')
  content = content.replace(/\d+\.\d+\.\d+\.\d+:\d+/, `${ip.address()}:${port}`)
  fse.writeFile(wechatAppJsPath, content, 'utf8')
}
