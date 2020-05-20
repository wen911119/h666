const gittar = require('gittar')
const inquirer = require('inquirer')
const { readJSON, writeJSON } = require('fs-extra')

const path = require('path')
module.exports = async function (directory) {
  if (typeof directory !== 'string') {
    directory = (await inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message: '请输入项目名称'
      }
    ])).directory
  }
  console.log('正在下载模版，请稍等...')
  const archive = await gittar.fetch('wen911119/h666')
  await gittar.extract(archive, path.resolve(process.cwd(), directory), {
    strip: 2,
    filter (path, obj) {
      if (path.includes('/boilerplate/')) {
        return true
      }
    }
  })
  // 修改项目名称
  const packageJsonPath = path.resolve(
    process.cwd(),
    directory,
    './package.json'
  )
  let packageJson = await readJSON(packageJsonPath)
  packageJson.name = directory
  // eslint-disable-next-line
  packageJson.version = "1.0.0"
  await writeJSON(packageJsonPath, packageJson, {
    spaces: 2
  })
  console.log('创建完成！')
}
