const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const koa_body = require('koa-body')
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    // ctx.response.status=200
    ctx.append('Access-Control-Allow-Origin', 'http://localhost:8080')
})
app.use(serve(path.resolve('public')))
app.use(koa_body())

const userRouter = require('./router/user.router')
app.use(userRouter.routes())

module.exports = app
