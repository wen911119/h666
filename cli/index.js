#!/usr/bin/env node
const program = require('commander')
const packageInfo = require('../package.json')
const options = require('minimist')(process.argv.slice(2))

program
  .version(packageInfo.version, '-v, --version')
  .allowUnknownOption()
  .description('h666-cli 工具')
  .usage('<command> [options]')

// add-page command
program
  .command('add')
  .description('新增页面')
  .action(() => {
    require('./commands/addPage')()
  })

// create new project command
program
  .command('create')
  .description('初始化一个新项目')
  .action(directory => {
    require('./commands/create')(directory)
  })

// start dev server
program
  .command('start')
  .option('-p, --port', 'dev server port, default 8080')
  .description('启动开发服务器')
  .action(port => {
    require('./commands/start')(port || 8080)
  })

// build command
program
  .command('build')
  .option('-t, --target', 'dev开发环境还是production生产环境? 默认生产环境')
  .option('-c, --container', '为哪个平台构建？默认浏览器环境,目前可选h5plus')
  .option('-p, --profile', '构建分析文件路径,默认不生成')
  .description('打包最终代码')
  .action((target, container, profile) => {
    require('./commands/build')(target, container, profile)
  })
program.parse(process.argv)

if (!options._.length) {
  program.help()
}
