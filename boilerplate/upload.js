const region = process.env.region
let accessKeyId = process.env.accessKeyId
let accessKeySecret = process.env.accessKeySecret
const bucket = process.env.bucket
const targetDir = process.env.targetDir || '/'

if (region && accessKeyId && accessKeySecret && bucket) {
  const fs = require('fs')
  const OSS = require('ali-oss')
  const path = require('path')
  const client = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  })
  const basePath = path.resolve('./dist')
  fs.readdir(basePath, function(err, files) {
    files.forEach(function(file) {
      const cacheControl = file.includes('.html')
        ? 'no-cache'
        : file.includes('sw.js') || file.includes('app.json')
        ? 'no-store'
        : 'max-age=63072000'
      client
        .put(targetDir + file, basePath + '/' + file, {
          headers: {
            'Cache-Control': cacheControl
          }
        })
        .then(result => {
          console.log('put success: %j', result)
        })
        .catch(error => {
          console.error('error: %j', error)
          throw new Error('upload oss fail !')
        })
    })
  })
} else {
  throw new Error('缺少必要环境变量！')
}
