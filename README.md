## 问答社区

### 需求分析

- 用户注册
  + 用户可以输入：用户名、邮箱、密码、验证码、同意协议 申请注册
    * 用户名：2-14 位、不能是纯数字、纯中文可以、只能包含自字母、数字、下划线、不支持特殊字符（不包含@#!.。。。）
     - 用户名：使用异步验证用户名不能重复
    * 邮箱：必须符合邮箱格式
    * 密码：6-16位
    * 验证码：后台校验，用户可以点击验证码更换新的验证码
    * 用户协议：必须同意才能发起注册请求
    * 以上的需要经过后端验证的功能，只要一经验证失败则重新刷新验证码
  + 注册验证码
  + 在这里可以先把业务设计的简单一点：先不考虑后台，注册成功，默认就是用户登陆成功了
  + 后续功能
    * 注册的同时可以填更多资料
    * 注册成功，必须通过邮箱激活才行
    * 邮箱激活之后，必须通过后台管理员审核通过才能登陆以及提问题、发文章等功能

- 用户登陆
  + 用户名：支持邮箱或者用户名
    * 用户名应该做表单校验，加入基本校验
  + 密码
  + 如果登陆失败，则提示用户用户名或密码不正确
  + 如果登陆成功：跳转到之前的资源的页面（注意，是网站内部的资源），同时顶部通栏中的显示为 发起、用户头像
  + 后续功能
    * 记住我：当用户登陆的时候，选择了记住我，下次打开该网站，默认就是登陆状态
    * 第三方登陆：qq、微信、微博

- 用户退出：点击 “退出” 按钮，跳转到一个退出页面（这个页面就是为了提示用户退出成功了）

- 后续功能
  + 忘记密码
  + 问题或者文章话题

- 发布问题、文章
  + 标题
  + 内容：支持 Markdown 富文本编辑器
- 编辑问题、文章
  + 将原有内容渲染到表单控件中
- 删除文章
  + 由管路员处理
- 问题、文章列表
  + 渲染到首页
  + 分页展示

- 文章评论
  + 用户可以通过在文章详情页，发表评论
  + 异步发表评论
  + 分页展示

### 技术栈

- Express
  + Express 就是一个基于 Node 开发的一个 Web 开发框架，用于 Server 端
  + Express 就是基于 Node 原生 http 核心模块封装的
  + 特性：中间件
  + Nunjucks 模板引擎
- MongoDB
  + 一个非关系型数据库
  + 这里就是为了持久化存储网站数据
- Ecmascript 6
  + Promise
  + Ecmascript 6 中的 模块化：export、import
  + class
  + 解构赋值
  + etc.
- Git
  + 使用 Git 作为项目的版本管理工具
- Github
  + 将项目托管到 Github 上
- babel
  + 这是一个类似于 less 的转译工具，可以用来将 ES6 语法转为 ES5
- 前端
  + Bootstrap
  + jQuery
  + Ajax
  + Markdown 富文本编辑器
  + 文件上传插件

### 项目初始化

- npm init -y
- git init

- .babelrc
- .editorconfig
  + [EditorConfig - 官网](http://editorconfig.org/)
  + [AlloyTeam - 【译】EditorConfig介绍](http://www.alloyteam.com/2014/12/editor-config/)
  + 该文件用来约束不同的开发人员的不同的编辑器或 IDE 中的代码风格设置，以保证项目中代码风格的统一
  + 某些 IDE ，例如 Webstorm 会自动根据这个文件去设置代码风格，例如缩进、编码等信息
  + 注意：这个文件只是规范上的约束，建议每个成熟的项目中都有这个文件，以保证团队开发人员的代码风格统一
  + 为什么要代码风格统一？
    * 你想一想：你打开你们团队的项目，有人用4个空格作为缩进，有人用2两，有人用一个tab，每个文件都不一样，乱七八糟的
    * 而且，如果风格不一致，很可能会造成文件内容冲突，有些版本管理软件会认为2个空格和4个空格不是同一行代码
    * 所以，在团队开发过程中，保证项目的代码风格的一致是很重要的
- .gitignore
  + 该文件用来配置 git 版本管理忽略项
  + 例如Webstorm自动生成的 .idea，node_modules(这种第三方依赖没有必要放到版本控制中，而且放到远端仓库也没有，传输很慢)
- package.json
  + `npm init [-y]`
  + `-y` 参数是可选的，加上表示直接生成 `package.json` 文件，没有向导
  + package.json 作为项目的依赖说明文件，用来保存使用 Node 安装的第三方包依赖，以及配置 npm 脚本命令，例如 npm start
- README.md
  + 项目说明文件，用来写一些描述信息，例如如何开发，项目介绍
- app.js
- views
- controllers
- models
- public
- node_modules
- routes
- config.js

### 路由设计

| 请求方法 |         请求路径         | Ajax |               作用               |
|----------|--------------------------|------|----------------------------------|
| GET      | /                        |      | 渲染 index.html                  |
| GET      | /account/register        |      | 渲染 register.html               |
| POST     | /account/register        | true | 处理注册请求                     |
| GET      | /account/check/:username | true | 处理校验用户名是否被占用         |
| GET      | /account/captcha         |      | 处理验证码                       |
| GET      | /account/login           |      | 渲染 login.html                  |
| POST     | /account/login           | true | 处理登陆请求                     |
| GET      | /publish                 |      | 渲染 publish.html                |
| POST     | /publish                 | true | 处理发布请求                     |
| GET      | /article/:id             |      | 根据文章id渲染 article.html      |
| GET      | /publish/article/:id     |      | 根据文章id渲染 publish_edit.html |
| POST     | /publish/article/:id     | true | 根据文章id处理编辑文章           |
| GET      | /setting/profile/        |      | 渲染当前用户个人信息页面         |
| POST     | /setting/profile/        | true | 处理用户更改个人信息请求         |
| GET      | /setting/security        |      | 渲染修改密码页面                 |
| POST     | /setting/security        | true | 处理修改密码请求                 |
| GET      | /comments/:article_id    | true | 根据文章id获取评论内容           |
| POST     | /comments/:article_id    | true | 发表评论到指定文章               |
|          |                          |      |                                  |

### 走通路由

### 数据库设计

### 模型设计

### 功能开发

## 配置 babel 环境

安装 es6 解析规则: `npm install --save-dev babel-preset-es2015`

配置 `.babelrc` 文件，内容如下：

```json
{
  "presets": [
    "es2015"
  ],
  "plugins": []
}
```

安装 `babel-register`：

```bash
$ npm install --save-dev babel-register
```

新建一个傀儡文件 index.js, 写入以下内容：

```js
require('babel-register')
require('你的项目入口文件')
```

只要通过了上面的配置，在开发过程中，就可以直接通过 `node index.js` 执行你的项目代码，
这样的话所有的代码就直接运行在 babel 环境中了，支持全部的 es6 语法。

## 关于开发环境和生产环境

有些包只是用来辅助开发的，真正到生产环境中就不需要了，例如 babel 转码器，
开发的时候可以使用 babel 体验最新 JavaScript 语法特性，但是如果放到生产服务器，由于它是实时编译转换，
所以性能不高，编译转换需要时间，所以最后放到生产环境之前，要将 es6 代码通过 babel 转为 es5。
就不需要依赖于 babel 了，可以直接通过 node 解析执行原生的 js 代码。

最终如果做了上面的处理之后，可以选择性是在生产环境安装生产环境依赖包，而开发环境的依赖包就不需要了。

npm 提供了一个 `npm install` 命令，可以直接安装 package.json 文件中所有的 `dependencies`
以及 `devDependencies` 中所有的依赖项。

如果你只想安装 `dependencies` 中的依赖项，可以通过 `npm install --production` 命令只安装
`dependencies` 中的依赖项。

## 运行说明

### 开发环境

```bash
$ npm install
$ npm run dev
```

### 生产环境

上线之前：

```bash
$ npm install
$ npm run build
```

放到生产环境：

```bash
$ npm install --production
$ npm start
```
