### 是什么
h666是以h5为主的hybird跨端解决方案。具体包括：组件库、cli工具、项目模版、CI/CD、错误搜集、性能监控。从开发到上线，一站式配齐。

### 怎么样
【微信小程序】
<div><img src="https://github.com/wen911119/h666/raw/master/assets/h666-wechat.png" width="120"></div>
【h5】
<div><img src="https://github.com/wen911119/h666/raw/master/assets/h666-h5.png" width="140"></div>
【hybrid】
安卓
<div><img src="https://github.com/wen911119/h666/raw/master/assets/h666-android.png" width="140"></div>
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
### 怎么用
全局安装cli工具
```
yarn global add @ruiyun/h666-cli
```
之后访问http://{本机ip}:3000就可以看到页面

### 快速创建页面
```
yarn add-page
```
会依次提示你输入页面名（英文页面名）和页面标题（会显示在标题栏），之后会帮你创建好h5页面和小程序页面。
同时会在package.json中增加pages属性记下页面名和标题的对应关系。

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
