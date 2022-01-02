const Router = require('koa-router')
const { addBoard } = require('../controller/bbs.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/bbs.middleware')

const router = new Router({ prefix: '/bbs' })

router.post(
    '/addBoard',
    validator({ boardName: 'string', description: 'string' }),
    auth,
    hadAdminPermission,
    addBoard
)

module.exports = router
