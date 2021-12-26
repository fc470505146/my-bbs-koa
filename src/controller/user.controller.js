const jsonwebtoken = require('jsonwebtoken')
const { addUser, update } = require('../service/user.service')
const {
    userRegisterError,
    loginError,
    changePasswordError,
    imageTypeError,
    patchImageError,
} = require('../constant/err.type')
const { JWT_SECRET } = require('../config')
const { ObjectId } = require('mongodb')
class UserController {
    async register(ctx) {
        const { username, password, nickname } = ctx.request.body
        try {
            const result = await addUser({ username, password, nickname })
            ctx.body = {
                code: 0,
                message: '注册成功',
                result: result,
            }
        } catch (error) {
            console.error('用户写入数据库失败', error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }

    async login(ctx) {
        //获取username
        const userInfo = ctx.state.user
        try {
            delete userInfo.password
            userInfo._id = userInfo._id.toString()
            // 签发token
            const token = jsonwebtoken.sign(userInfo, JWT_SECRET, {
                expiresIn: '7d',
            })
            ctx.body = {
                code: 0,
                message: '登录成功',
                result: { token },
            }
        } catch (error) {
            console.error('登录失败', error)
            ctx.app.emit('error', loginError, ctx)
        }
    }

    async changePassword(ctx) {
        const userInfo = ctx.state.user
        try {
            const { changePassword } = ctx.request.body
            const _id = ObjectId(userInfo._id)
            const result = await update(
                { _id },
                { $set: { password: changePassword } }
            )
            ctx.body = {
                code: 0,
                message: '修改成功',
                result: {
                    acknowledged: result.acknowledged,
                },
            }
        } catch (error) {
            console.error('修改密码失败', error)
            ctx.app.emit('error', changePasswordError, ctx)
        }
    }

    async upload(ctx) {
        const file = ctx.state.files.file
        try {
            const _id = ObjectId(ctx.state.user._id)
            if (file) {
                update({ _id }, { $set: { headpath: file.newFilename } })
                ctx.body = {
                    code: 0,
                    status: 200,
                    result: {
                        pathname: file.newFilename,
                    },
                }
            } else {
                console.error('文件不符合格式要求', file)
                ctx.app.emit('error', imageTypeError, ctx)
                return
            }
        } catch (error) {
            console.error('上传图像路径错误', error)
            ctx.app.emit('error', patchImageError, ctx)
            return
        }
    }
}

module.exports = new UserController()
