const inquirer = require('inquirer')
const { exists, createFile, writeFile, readFile, remove, readJSON, writeJSON } = require('fs-extra')
const { resolve } = require('path')
const chalk = require('chalk')

const errorTag = chalk.red('[创建失败]')
const successTag = chalk.green('[创建成功]')

module.exports = async function addPage () {
  const currentDir = process.cwd()
  const pageDir = resolve(currentDir, './src/pages')
  const wechatDir = resolve(currentDir, './wechat/pages')

  if (!(await exists(pageDir))) {
    console.error(' ')
    console.error(errorTag, '没有找到 src/page 目录')
    console.error(errorTag, '请确保你当前在正确的工程目录')
    console.error(' ')
    process.exit(1)
  }

  const pageName = (await inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: '请输入页面名'
    }
  ])).pageName

  const pageTitle = (await inquirer.prompt([
    {
      type: 'input',
      name: 'pageTitle',
      message: '请输入页面标题'
    }
  ])).pageTitle

  const pageDistPath = resolve(pageDir, pageName)
  const pageDistJsFile = resolve(pageDistPath, 'app.js')
  const pageDistCssFile = resolve(pageDistPath, 'app.css')

  const wechatDistPath = resolve(wechatDir, pageName)
  const pageDistWxjsFile = resolve(wechatDistPath, 'index.js')
  const pageDistJsonFile = resolve(wechatDistPath, 'index.json')
  const pageDistWxmlFile = resolve(wechatDistPath, 'index.wxml')
  const pageDistWxssFile = resolve(wechatDistPath, 'index.wxss')

  if (await exists(pageDistPath)) {
    console.log(' ')
    console.log(chalk.red('[创建失败]'), `页面${pageName}已存在`)
    console.log(' ')
    process.exit(1)
  }

  try {
    // 创建页面
    const pageTemplate = await readFile(
      resolve(__dirname, '../template/web-page/app.js'),
      'utf8'
    )
    await createFile(pageDistJsFile)
    await writeFile(
      pageDistJsFile,
      pageTemplate.replace(/###_page-name_###/g, ucFirst(pageName))
    )
    // css
    const cssTemplate = await readFile(
      resolve(__dirname, '../template/web-page/app.css'),
      'utf8'
    )
    await createFile(pageDistCssFile)
    await writeFile(pageDistCssFile, cssTemplate)

    // 修改packageJson
    const packageJsonPath = resolve(currentDir, './package.json')
    let packageJson = await readJSON(packageJsonPath)
    packageJson.pages[pageName] = pageTitle
    await writeJSON(packageJsonPath, packageJson, {
      spaces: 2
    })

    // 小程序
    // js
    const wxjsTemplate = await readFile(
      resolve(__dirname, '../template/wechat-page/index.js'),
      'utf8'
    )
    await createFile(pageDistWxjsFile)
    await writeFile(
      pageDistWxjsFile,
      wxjsTemplate.replace(/###_page-name_###/g, pageName)
    )
    // wxml
    const wxmlTemplate = await readFile(
      resolve(__dirname, '../template/wechat-page/index.wxml'),
      'utf8'
    )
    await createFile(pageDistWxmlFile)
    await writeFile(pageDistWxmlFile, wxmlTemplate)
    // wxss
    const wxssTemplate = await readFile(
      resolve(__dirname, '../template/wechat-page/index.wxss'),
      'utf8'
    )
    await createFile(pageDistWxssFile)
    await writeFile(pageDistWxssFile, wxssTemplate)
    // json
    let jsonTemplate = await readFile(
      resolve(__dirname, '../template/wechat-page/index.json'),
      'utf8'
    )
    if (pageTitle) {
      jsonTemplate = jsonTemplate.replace('"navigationBarTitleText": "WeChat"', `"navigationBarTitleText": "${pageTitle}"`)
    }
    await createFile(pageDistJsonFile)
    await writeFile(pageDistJsonFile, jsonTemplate)
    // 给小程序加一条路由
    const configFilePath = `${currentDir}/wechat/app.json`
    let appConfig = await readJSON(configFilePath)
    appConfig.pages.push(`pages/${pageName}/index`)
    await writeJSON(configFilePath, appConfig, {
      spaces: 2
    })
  }
  catch (e) {
    console.log(' ')
    console.log(errorTag, e)
    console.log(' ')
    remove(pageDistPath)
    process.exit(1)
  }

  console.log(' ')
  console.log(successTag, `页面${pageName}创建成功`)
  console.log(' ')
}

// 首字母大写
function ucFirst (str) {
  return str.replace(/^([a-z])(.+)/, (m, m1, m2) => m1.toUpperCase() + m2)
}
