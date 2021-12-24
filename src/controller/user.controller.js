const { addUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
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
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
