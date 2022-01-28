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
    let token
    try {
        token = authorization.replace('Bearer ', '')
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                console.error('token过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效token', 'token:', token, error)
                return ctx.app.emit('error', tokenInvalid, ctx)
            default:
                console.error('token异常', error)
                return ctx.app.emit('error', tokenError, ctx)
        }
    }
    await next()
}

const hadAdminPermission = async (ctx, next) => {
    const { roles = [] } = ctx.state.user
    if (!roles.includes('admin')) {
        console.error('用户无管理员权限', ctx.state.user)
        ctx.app.emit('error', hadAdminErorr, ctx)
        return
    }
    await next()
}
module.exports = { auth, hadAdminPermission }
