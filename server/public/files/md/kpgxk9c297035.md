# Koa2

## 1.开始

Koa是一个简约、扩展性极强的基于Node.js平台后端开发框架

在nodejs中有很多的框架可以使用，其中最为出名的是express，express是一个大而全的框架，集成了很多实用的中间件，很省心，缺点也是太臃肿了，同时express是基于ES5开发，API的设计也是基于回调函数（回调是JS中最头疼的一个存在）。Koa是express原班人马打造的一个小而轻的框架，koa本身不提供任何中间件，需要使用不同的功能可以自行安装第三方依赖。

Koa主要分为Koa1.x和Koa2.x，主要区别是1.x版本基于ES6异步解决的过渡方式`generator/yield`，而全新的Koa2.x则基于ES6的异步终极解决方案`async/await`

> 个人浅见，ES6-7最重大且对开发者有用的更新就是async/await的异步解决方案，无出其右

## 2.原理

Koa是一个有趣的框架，它将所有的需要用的功能都称为中间件，并且以一种特殊的级联方法组织这些中间件，Koa在处理需求的时候，会产生一个ctx上下文对象，相关的请求和响应对象都在这个ctx上下文对象身上。通过这个ctx对象在各个中间件之间进行串联响应，这种模型成为`洋葱模型`，因为它确实很像一个洋葱

![洋葱模型](http://img-hosting.zzhitong.com/images/bV6DZG.webp)

![bV6D5Z](http://img-hosting.zzhitong.com/images/bV6D5Z.webp)

上述两图清晰的表现了中间件的响应过程

## 3.安装

因为Koa2使用`async/await`，所以需要依赖**Node v7.6.0**以上版本

```shell
npm i -S koa
```

## 4.应用

```js
const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
// 应用监听在3000端口上
app.listen(3000);
```

此时在浏览器中访问`http://localhost:3000`即可看到`Hello Koa`

## 5.路由

路由就是网络地址，不同的服务对应有不同的网络地址，一个web程序由很多的子服务构成，那么不同的子服务就需要有不同的地址，这就是路由。

由于Koa是一个轻便的框架，Koa默认没有集成任何工具，包括路由。所以想要使用路由，可以选择自行实现，或者使用第三方包

### 原生实现

```js
const Koa = require('koa')
const app = new Koa()

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
function route( url ) {
  let view = '这是404页面'
  switch ( url ) {
    case '/':
      view = '这是index页面'
      break
    case '/index':
      view = '这是index页面'
      break
    case '/todo':
      view = '这是todo页面'
      break
    case '/404':
      break
    //default:
    //break
  }
  return view
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = route( url )
  ctx.body = html
})

app.listen(3000)
```

访问不同的地址即可看到不同的内容，例如

<img src="http://img-hosting.zzhitong.com/images/image-20201216210513227.png" alt="image-20201216210513227" style="zoom:200%;" />

<img src="http://img-hosting.zzhitong.com/images/image-20201216210527445.png" alt="image-20201216210527445" style="zoom:200%;" />

### koa-router

不过自行实现路由太过麻烦。所以可以使用第三方的一些依赖

> 使用第三方依赖都需要先安装

```shell
npm i -S koa-router
```

使用方法

```js
const Koa = require('koa')
const app = new Koa()

const router = require('koa-router')()

// 通过router工具监听不同的路由并返回不同的结果
router.get("/", async ctx => {
    ctx.body = '这是index页面'
})

router.get("/index", async ctx => {
    ctx.body = '这是index页面'
})

router.get("/todo", async ctx => {
    ctx.body = '这是todo页面'
})

router.get("/404", async ctx => {
    ctx.body = '这是404页面'
})

// 加载路由中间件
// 将4个不同的路由绑定给koa
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)
```

即可看到上述一样结果

具体koa-router说明可查看[官方仓库](https://github.com/ZijianHe/koa-router)

## 6.数据交互

数据交互是程序必不可少的部分，前端将请求通过`ajax`发送到后端指定路由后，后端需要将请求进行处理

HTTP请求的方式有8种，分别是

- HTTP1.0定义的三种：GET、POST、HEAD
- HTTP1.1定义的五种：OPTIONS、PUT、DELETE、TRACE、CONNECT

| 方法    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| GET     | 请求指定的页面信息，并返回实体主题                           |
| POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| HEAD    | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 |
| OPTIONS | 允许客户端查看服务器的性能。                                 |
| PUT     | 从客户端向服务器传送的数据取代指定的文档的内容。             |
| DELETE  | 请求服务器删除指定的页面。                                   |
| TRACE   | 回显服务器收到的请求，主要用于测试或诊断。                   |
| CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。    |

### koa-body

后台处理数据时，可以使用的第三方依赖有很多的选择，例如`koa-body`、`koa-bodyparser`，不同的依赖使用方式都大同小异。

```js
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const koaBody = require('koa-body')

// 在所有路由之前将koabody挂在到koa对象上，后续的请求均会被处理
app.use(koaBody())
// 监听/users下的post请求，post的数据在ctx.request.body下
router.post('/users', ctx => {
    let {username, password} = ctx.request.body
    // node处理后返回给前端用户
    ctx.body = `您发送的用户名：${username}, 密码：${password}`
  }
)

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000)
```

模拟前端用户请求后，即可获得数据

![image-20201217152436919](http://img-hosting.zzhitong.com/images/image-20201217152436919.png)

koa-body的具体配置说明可以查看[官方仓库](https://github.com/dlau/koa-body)

## 7.静态资源

web程序中通常有很多静态资源，是不需要对应的路由处理的，此时就需要搭建一个静态资源服务器直接将数据返回。如果没有静态资源服务器，例如当需要请求img、js或css时，就会请求失败。

自行搭建静态资源服务器时，通常是进行判断文件的mime类型，然后读取与之对应的文件，并返回。过程太过麻烦，我们还是直接使用依赖包把。

### koa-static

[官方仓库](https://github.com/koajs/static#readme)

文件目录

```js
├── app.js	# 入口文件
├── package.json  
├── static # 静态资源目录
│   ├── logo.png 
│   └── test.txt
├── view # 视图文件
│   ├── 404.html
│   └── index.html
└── yarn.lock
```

代码

```js
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static')

app.use(static(
  // 设置静态资源存放的目录
  "./static"
))


app.listen(3000)
```

如此即可直接拿到静态资源

<img src="http://img-hosting.zzhitong.com/images/image-20201217164024875.png" alt="image-20201217164024875" style="zoom:150%;" />

<img src="http://img-hosting.zzhitong.com/images/image-20201217164123475.png" alt="image-20201217164123475" style="zoom: 200%;" />

## 8. koa-views

渲染模板

```js
const Koa = require('koa');
const app = new Koa();
const static = require('koa-views')

app,use(views("./public"))
// 可支持其他模板引擎，如pug。
router.get("/", async ctx => {
    // 访问跟路由，返回首页模板文件
    await ctx.render('index.html')
})
```

[具体配置查看](https://www.npmjs.com/package/koa-views)

## 9. koa-send

给客户端返回文件，如果需要浏览器端以下载的方式打开需要设置`attachment`

```js
const Koa = require('koa')
const app = new Koa()
const send = require('koa-send')
const {resolve: rsl} = require('path')

router.get("/download", async ctx => {
    let filename = "1.txt"
    // 让浏览器以下载方式接受, 需要设置响应头中的attachment
    ctx.attachment(filename)
    await send(ctx, filename, rsl(__dirname, filename))
})

...
```

## 10. 跨域访问

服务端允许跨域访问

```js
const Koa = require('koa')
const app = new Koa()
const cors = require('@koa/cors')

// 允许任何域访问
app.use(cors())
```

