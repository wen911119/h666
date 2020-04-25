### 简介
h666是以h5为主的hybird跨端解决方案。具体包括：组件库、cli工具、项目模版、CI/CD、错误搜集、性能监控。从开发到上线，一站式配齐。

---
### Demo
【微信小程序】
<div><img src="https://github.com/wen911119/h666/raw/master/demo/src/assets/qrcode/h666-wechat.png" alt="微信搜索【h666解决方案演示】" width="120"></div>
【h5】
<div><img src="https://github.com/wen911119/h666/raw/master/demo/src/assets/qrcode/h666-h5.png" alt="https://h666-demo.ruiyun2015.com" width="140"></div>
【hybird】
安卓(基于RN)
<div><img src="https://github.com/wen911119/h666/raw/master/demo/src/assets/qrcode/h666-android.png" alt="https://h666-demo.ruiyun2015.com/h666Hybird.apk" width="140"></div>
【支付宝小程序】

```
todo
```
【头条小程序】
```
todo
```
【其它小程序】
```
todo
```

---
### 快速开始
##### 1. 全局安装cli工具
```
yarn global add @ruiyun/h666-cli
```
##### 2. 用cli初始化一个新的项目
```
h666 create
```
按照提示输入项目名称，等待下载模版并初始化，完成后会看到提示。

##### 3. 安装依赖并启动开发

在项目目录下
```
yarn & yarn start
```
之后访问http://{本机ip}:3000就可以看到h5页面。

小程序预览见下面【小程序】

App预览见面【HybirdApp】

修改src/pages/index/app.js,保存后可以看到页面已经自动更新。

##### 4. 增加一个页面

在项目根目录下
```
yarn add-page
```
会依次提示你输入页面名（英文页面名）和页面默认标题（会显示在标题栏），之后会帮你创建好h5页面和小程序页面。
同时会在package.json中增加pages属性记下页面名和标题的对应关系。

##### 5. 路由跳转

参考首页跳转到list页的路由用法，被WithRouter装饰器装饰后，会在props上多出一个\$router属性，\$router.push跳转到下一个页面，$router.pop跳回上一个页面，\$router.params是路由参数。具体API可以参考路由组件文档。

---

### 目录结构约定

```
h666-project
  │
  ├──── src
  │      ├── assets(资源文件)
  │      │     └──logo.png
  │      │
  │      ├── libs(工具库)
  │      │     └──md5.js
  │      │
  │      ├── components(公共组件) 
  │      │     └──Cell(组件名文件夹)
  │      │          ├──index.js(组件代码)
  │      │          └──index.css(组件样式)
  |      |          
  │      ├── constans(常量配置)
  │      │     ├──apis.js(接口常量)
  │      │     └──other.js(其它常量)
  │      │
  │      ├── pages(页面)
  │      │     └──index(首页)
  │      │          ├──app.js
  │      │          ├──app.css
  │      │          └──entry.js(页面级自定义entry,特殊情况才需要)
  │      │ 
  │      ├── services(服务-包装后端接口)
  │      │     └──UserServcie.js(首字母大写)
  │      │        
  │      ├── sw.js(自定义serviceworker,特殊情况才需要)
  │      │
  │      ├── entry.js(自定义entry,特殊情况才需要)
  │      │ 
  │      └── template.html(自定义模版，特殊情况才需要)
  │
  ├──── wechat(微信小程序模版代码，一般不需要改动)
  │
  ├──── .gitlab-ci.yml(gitlab环境下配合多阶段构建的CI脚本)
  │
  ├──── Dockerfile(多阶段构建脚本)
  │
  ├──── upload.js(非docker环境下的上传脚本)
  │
  └──── package.json
```

---

### 小程序

启动h666项目后，用微信开发者工具打开wechat目录就预览小程序内的效果。注意本地开发需要勾选不校验安全域名。真机预览需要开启调试。提交小程序审核时需要修改wechat/app.js内host变量为h5的线上域名。并在微信后台配置业务域名和安全域名。

---
### HybirdApp（基于RN）

文档待完善

---


### ServiceWorker
默认只在安卓平台启用ServiceWorker,因为IOS的应用内WkWebview不支持sw，Safari虽然支持但是会导致bfcache失效。如果你想修改默认设置,可以修改package.json中的ServiceWorker字段的正则。

---

### 错误搜集Sentry

参考[demo](https://github.com/wen911119/h666/blob/master/demo/package.json)在packge.json中配置Sentry字段。

---

### 分析优化打包体积
在项目根目录下运行
```
yarn build:pro:analyse
```
会生成一个profile.json文件。去[这里](http://webpack.github.io/analyse/)上传这个JSON文件，分析各个页面的组成，提取公共依赖进common.js

---

### 装饰器

为了优雅实现依赖注入,已经默认支持es7+的装饰器用法。用API形式调用的组件都是装饰器实现。比如路由的WithRouter,对话框组件的WithDialog等。

---

### 构建目标全局变量
```javascript
console.log($BUILD_TARGET$)
// 本地开发(yarn start) ==> local
// 测试环境(yarn build:dev) ==> dev
// 生产环境(yarn build:pro) ==> production
```
可以根据不同值来走不同api的endpoint

### 修改响应式基础
默认是按照移动端750px的设计的，如果要修改，可以在package.json里加一个属性p2rBase，值改为设计稿尺寸，比如1080。

### 修改默认页面模版
可以在项目根目录下放一个自定义的template.html

### 提取公文js库进common.js
package.json中有一个commonChunks属性，里面记录了要进common.js的包名。

### 自定义entry
#### 方式一:
在/src/下建立一个entry.js,写入
```javascript
export default function onEntry () {
  // 下面的代码每个页面初始化时都会执行
  console.log('hhh')
}
```
这个onEntry函数每个页面初始化都会执行。
#### 方式二:
在 src/pages/{页面名}/ 下建立entry.js,写入
```javascript
export default function onEntry () {
  // 下面的代码只有该页面初始化时会执行
  console.log('dddd')
}
```
这个onEntry函数只有这个页面初始化时才会执行。
方式二的entry会覆盖方式一。

### 自定义兼容性
默认的js和css兼容性是“last 2 versions”。如果不满足你的需要，可以在package.json中加入
```json
{
  "browsers": [
    "android >= 4.4",
    "ios >= 8"
  ]
}
```
可以参考[browserl.ist](https://browserl.ist/)来设置你想要的兼容性。

### 自定义后编译的包
默认只会编译src下面的js文件。但是有些npm包是需要编译后再使用的(个人推荐这种方式),比如@ruiyun/preact-m-router,@ruiyun/preact-layout-suite等。可以在package.json中加入
```json
{
  "include": [
    "@ruiyun",
    "p-to-r",
    "h5-indicator"
  ],
}
```
来自定义加入需要后编译的包名。
