const Router = require('koa-router')
const { register, login, changePassword, upload, deleteUserById, findPage, findUser, getUserInfo, updateUser, addUserList, getUserAvatarById, updateUserInfoById, } = require('../controller/user.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { parseUpload, paresExcel } = require('../middleware/upload.middleware')
const { verifyUser, verifyLogin, verifyDeleteUser, verifyChangePassword, checkPassword, verifyFindPage, verifyFindUser, parseUserList, } = require('../middleware/user.middleware')
const { validator } = require('../middleware/utils.middleware')

const router = new Router({ prefix: '/users' })

//注册接口
router.post( '/register', validator({ username: 'string', password: 'string', nickname: 'string', }), verifyUser, register )

//登录接口
router.post( '/login', validator({ username: 'string', password: 'string', }), verifyLogin, login )

//修改密码接口
router.patch('/', auth, verifyChangePassword, checkPassword, changePassword)

//上传头像
router.patch('/upload', auth, parseUpload, upload)

//删除用户
router.post( '/delete', verifyDeleteUser, auth, hadAdminPermission, deleteUserById )

//分页查询所有用户
router.post('/findPage', verifyFindPage, auth, hadAdminPermission, findPage)
//查询用户
router.post('/find', verifyFindUser, auth, hadAdminPermission, findUser)

//获取用户信息
router.get('/getInfo', auth, getUserInfo)

//修改用户信息
router.put( '/updateUser', validator({ _id: 'string', password: 'string', nickname: 'string', }), auth, hadAdminPermission, updateUser )
//批量添加用户使用xlxs
router.post( '/addUserList', auth, hadAdminPermission, paresExcel, parseUserList, addUserList )
//根据id获得用户头像
router.post('/getAvatar', validator({ _id: 'string' }), auth, getUserAvatarById)
//用户自己修改信息
router.post( '/update/userInfo', validator({ nickname: 'string' }), auth, updateUserInfoById )
module.exports = router
