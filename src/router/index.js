const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
        let route = require('./' + file)
        router.use(route.routes())
    }
})

module.exports = router
