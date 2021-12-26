const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const {
    tokenError,
    tokenExpiredError,
    tokenInvalid,
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

module.exports = { auth }
