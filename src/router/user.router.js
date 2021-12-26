const Router = require('koa-router')
const {
    register,
    login,
    changePassword,
    upload,
} = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')
const { parseUpload } = require('../middleware/upload.middleware')
const {
    userValidator,
    verifyUser,
    verifyLogin,
    loginValidator,
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' })

//注册接口
router.post('/register', userValidator, verifyUser, register)

//登录接口
router.post('/login', loginValidator, verifyLogin, login)

//修改密码接口
router.patch('/', auth, changePassword)

//上传图品
router.patch('/upload', auth, parseUpload, upload)
module.exports = router
