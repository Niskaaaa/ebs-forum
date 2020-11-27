# toimc-wxapp

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 遇到的一些问题

## 微信小程序没有找到可以构建的NPM包，请确认需要参与构建的npm在miniprogramroot目录

进dist/wx/目录

```c
npm init -y
npm i miniprogram-sm-crypto --production
```



# flex布局

```
 justify-content: flex-end;//底部对齐
```

![image-20201106001141971](G:\miniProgram\WeChatProjects\firstApp\toimc-wxapp\README.assets\image-20201106001141971.png)

默认flex-direction:row

如果设置为column justify和align要互换位置



justify-content:space-around

![image-20201106004200987](G:\miniProgram\WeChatProjects\firstApp\toimc-wxapp\README.assets\image-20201106004200987.png)

space-evenly

![image-20201106004215126](G:\miniProgram\WeChatProjects\firstApp\toimc-wxapp\README.assets\image-20201106004215126.png)



# zoom

调整整体页面大小

zoom:0.5

# wx.getSystemInfo

statusBarHeight

根据顶部状态栏的高度 ios状态栏是24，而安卓是30



# navigationStyle:custom

可以自己设定头部的导航栏

# 页面跳转

在tab间进行切换 用switchTab

从父页面访问子页面，用navigateTo，保留当前页面，跳转到应用内的某个页面，但不能跳转到tabbar页面

# 微信登陆

发起网络请求是客户端向服务器请求，带上了一个code，随后服务器带上code，用服务器私密的appid和appsecret，去请求微信的服务