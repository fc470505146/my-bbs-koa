const path = require('path')

const Koa = require('koa')
const serve = require('koa-static')
const KoaBody = require('koa-body')
const koaParameter = require('koa-parameter')
const cors = require('@koa/cors')
const router = require('../router')

const app = new Koa()

// app.use(async (ctx, next) => {
//     console.log(ctx.request)
//     await next()
// })
//解决跨域问题

app.use(cors())
//设置静态文件位置
app.use(serve(path.resolve('public')))
//引入koabody和router，并进行一定的配置
app.use(koaParameter(app))
app.use(KoaBody())
app.use(router.routes())

//异常统一处理
app.on('error', (err, ctx) => {
    ctx.status = err.status ?? 500
    ctx.body = err
})

module.exports = app
