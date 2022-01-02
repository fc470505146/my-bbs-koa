const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const {
    tokenError,
    tokenExpiredError,
    tokenInvalid,
    hadAdminErorr,
} = require('../constant/err.type')

const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效token', error)
                return ctx.app.emit('error', tokenInvalid, ctx)
            default:
                console.error('token异常', error)
                return ctx.app.emit('error', tokenError, ctx)
        }
    }
    await next()
}

const hadAdminPermission = async (ctx, next) => {
    const { admin } = ctx.state.user
    if (!admin) {
        console.error('用户无管理员权限', ctx.state.user)
        ctx.app.emit('error', hadAdminErorr, ctx)
        return
    }
    await next()
}
module.exports = { auth, hadAdminPermission }
