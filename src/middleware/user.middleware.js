const { find } = require('../service/user.service')
const {
    userFormateError,
    userRegisterError,
    userAlreadyExists,
} = require('../constant/err.type')

//校验值
const userValidator = async (ctx, next) => {
    const { username, password, nickname } = ctx.request.body
    if (!username || !password || !nickname) {
        console.error('用户名或者密码或昵称为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}
//校验合理性
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    try {
        const result = await find({ username })
        if (result.length) {
            ctx.app.emit('error', userAlreadyExists, ctx)
            return
        }
    } catch (err) {
        console.error('用户注册错误,查询用户失败', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}
module.exports = { userValidator, verifyUser }
