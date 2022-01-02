const Router = require('koa-router')
const {
    register,
    login,
    changePassword,
    upload,
    deleteUserById,
    findPage,
    findUser,
} = require('../controller/user.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { parseUpload } = require('../middleware/upload.middleware')
const {
    userValidator,
    verifyUser,
    verifyLogin,
    loginValidator,
    verifyDeleteUser,
    verifyChangePassword,
    checkPassword,
    verifyFindPage,
    verifyFindUser,
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' })

//注册接口
router.post('/register', userValidator, verifyUser, register)

//登录接口
router.post('/login', loginValidator, verifyLogin, login)

//修改密码接口
router.patch('/', auth, verifyChangePassword, checkPassword, changePassword)

//上传图品
router.patch('/upload', auth, parseUpload, upload)

//删除用户
router.post(
    '/delete',
    verifyDeleteUser,
    auth,
    hadAdminPermission,
    deleteUserById
)

//分页查询所有用户
router.post('/findPage', verifyFindPage, auth, hadAdminPermission, findPage)
//查询用户
router.post('/find',verifyFindUser,auth,hadAdminPermission,findUser)
module.exports = router
