const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const koa_body = require('koa-body')
const app = new Koa()

//解决跨域问题
app.use(async (ctx, next) => {
    await next()
    ctx.append('Access-Control-Allow-Origin', 'http://localhost:8080')
})
app.use(serve(path.resolve('public')))
app.use(koa_body())

const userRouter = require('./router/user.router')
app.use(userRouter.routes())

//异常统一处理
app.on('error', (err, ctx) => {
    console.error(err, ctx)
    ctx.status=err.status
    ctx.body=err
})

module.exports = app
