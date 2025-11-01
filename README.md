# L2dPetForMac/Live2d桌宠

## 前言

希望有生之年整合完善所有功能点，成为可配置，可扩展，可自定义的多功能应用。

持续维护中 - 20200831 - 20220330 - 时隔2年重构一次

## 作者的逼逼叨

* 因为本是程序员，想要在Mac上运行一个可爱的小萝莉很久了。苦于Mac市场目前我找了很久都没找到符合心意的项目。
* 于是自己写了一套并且开源！
* 然后目前项目初期,现阶段可能类似demo版本，整个项目需要的所有技术点对我而言都是直接上手，代码可能不会很优雅。
* 如果你会js，node，你将很容易玩转这个项目！因为我已经给你搭好架子了。（踩了超多坑！！！
* 最后:如果你喜欢live2d，喜欢这个项目,欢迎fork,反馈,一定第一时间解答!

## 环境 
### 小于2.0.0
1. chrome 83.0.4103.64
2. node 12.14.1
3. electron 9.1.0
4. Live2D Cubism Core version: 04.00.0000 (67108864)

### 2.0.0
1. chrome 83.0.4103.64
2. node 12.14.1
3. electron 12.2.3
4. Live2D Cubism Core version: 4.1.0


## 当前状态

- 仅保留最基础的桌宠展示能力：Live2D 模型加载、动作播放、换模与缩放。
- 所有原邮件、弹幕、Chrome 历史等拓展功能已移除，默认不再依赖本地服务或数据库。
- 全局鼠标联动改为可选：`iohook` 可在本地编译成功时开启，失败将自动降级为普通模式。
- macOS Panel 原生插件不再强制依赖，使用 Electron 自带 `BrowserWindow` 实现置顶与透明效果。

## 主要功能

1. 窗口置顶与透明无边框展示
2. 加载与展示 Live2D 模型，支持基础动作播放
3. 切换不同 Live2D 模型场景
4. 桌宠位置拖拽与全局鼠标联动
5. 快捷键控制桌宠显示/隐藏与调试工具切换
## 项目开始

### 本项目食用方法

> 开发环境准备

1. 在项目根目录执行一次依赖安装，跳过原生模块编译：
   ```bash
   yarn install --mode=skip-build
   ```
2. 进入 `live2d` 子工程安装依赖并保持同样配置：
   ```bash
   cd live2d
   yarn install --mode=skip-build
   ```
3. 首次或更新后需要重新打包 Live2D bundle：
   ```bash
   NODE_OPTIONS=--openssl-legacy-provider yarn run build
   ```
   > 若已在 `live2d/dist/bundle.js` 中生成过，可按需跳过这一步。

> 运行桌宠

在项目根目录运行：
```bash
yarn start
```
默认会启动 Electron 窗口，展示 Live2D 桌宠。若终端输出 `iohook unavailable`，说明未启用全局鼠标追踪，可忽略。

> 可选：Live2D 热更新

如果需要实时调试 Live2D TS 源码，可在 `live2d` 目录启动 DevServer：
```bash
cd live2d
NODE_OPTIONS=--openssl-legacy-provider yarn run start
```
Webpack 将监听源码并重新输出 `dist/bundle.js`。

> tips

主进程的处理逻辑都在 `app/main/` 目录下
渲染进程的逻辑 `app/renderer/` 目录下


## 运行
> 正常显示

![](https://raw.githubusercontent.com/LikeNeko/L2dPetForMac/master/images/Snipaste_2020-07-10_10-34-04.jpg)

> Dock栏级别的显示

![](https://raw.githubusercontent.com/LikeNeko/L2dPetForMac/master/images/2020-07-07-020929.jpeg)

> 左边是model模型，右边是model3模型 ps:实验性测试,结论是ok的，就是支持live2d可以加载不同版本的模型

![图片](https://raw.githubusercontent.com/LikeNeko/L2dPetForMac/master/images/2020-07-02-094546.jpeg)

## 打包发布

- macOS DMG：
  ```bash
  yarn build-mac
  ```
  产物会生成在 `dist/`，需要 Xcode Command Line Tools 与 codesign 相关环境。若需要持续集成，可使用 `yarn build-mac-p` 强制发布。
- 重新构建 `iohook` 等原生依赖时，可使用 `yarn build_iohook`（需具备匹配的 Node/Electron Headers 环境）。

## fork前需要技术栈

1. js `live2d` 4.0打包之后是这个
2. ts `live2d` 4.0的sdk需要这个
3. nodejs electron需要这个
4. oc 需要了解程度，窗口顶端化需要这个语言
5. c++ 需要了解程度，涉及到nodejs和oc通信
6. webgl 需要有了解，`live2d`展示核心是这个
7. 需要看一遍 electron 的官网那些文档最起码的概念要知道 [官网文档](https://www.electronjs.org/docs)
8. live2d 官网的sdk文档，建议每个字都去看一下，建议选日语或者英语用`chrome浏览器`自带的翻译看，官网的机翻更渣 [live2d官网文档4.0](https://docs.live2d.com/cubism-sdk-manual/top/?locale=ja) 

## 已知bug

1. loop方法更新动画时会出现警告-[已解决]原因是为了实现透明区域点击穿透导致的性能问题。


## 需要优化

1. cpu占用率过高-因为live2dsdk4的渲染是使用的cpu，导致`drawImage`方法太费cpu资源了。后续可以优化一下

## 依赖

由此项目扩展出的让窗口置顶的方法

[electron-panel-window 魔改](https://github.com/goabstract/electron-panel-window)
