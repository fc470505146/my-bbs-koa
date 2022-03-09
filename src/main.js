const app = require('./app')
const { APP_PORT } = require('./config')
const winlogger = require('./winstonLogger')
winlogger.info('项目开始运行')
app.proxy=true
app.listen(APP_PORT, () => {
    console.log(`server is running on
     http://localhost:${APP_PORT}`)
})

//db.user.insertOne({ "_id" : ObjectId("61cfafc28de69ef19ee38020"), "username" : "root", "password" : "root", "nickname" : "超级管理员", "avatar" : "/img/976df8119e30fe74f7cfb8901.jpeg", "roles" : [ "admin" ] })
