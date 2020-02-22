const webpack = require('webpack')
const path = require('path')
const {
  readdirSync,
  outputJSON,
  writeFileSync
} = require('fs-extra')

module.exports = function (buildTarget, container, profile) {
  if (typeof buildTarget !== 'string') {
    buildTarget = 'production'
  }
  if (container==='h5plus') {
    process.env.BUILD_CONTAINER = container
  }
  process.env.BUILD_TARGET = buildTarget
  let webpackConfig = require('../webpack/config')
  webpackConfig.mode = 'production'
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats)
    }
    else {
      if (profile) {
        writeFileSync(path.resolve(process.cwd(), profile), JSON.stringify(stats.toJson()))
      } else {
        console.log(stats.toString({
          chunks: true,  // Makes the build much quieter
          colors: true    // Shows colors in the console
        }))
        const distDir = path.resolve(process.cwd(), './dist')
        const appInfo = {
          version: Date.now(),
          hash: {}
        }
        readdirSync(distDir).forEach(file => {
          const matched = file.match(/(.+)\.(.+)\.bundle\.js/)
          if (matched) {
            appInfo.hash[matched[1]] = matched[2]
          }
        })
        outputJSON(path.resolve(process.cwd(), './dist/app.json'), appInfo)
      }
      console.log('build success')
    }
  })
}
