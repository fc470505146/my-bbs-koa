const path=require('path')
const Koa=require('koa')
const serve=require('koa-static')
const koa_body=require('koa-body')
const app=new Koa()
app.use(serve(path.resolve('public')))
app.use(koa_body())



module.exports=app