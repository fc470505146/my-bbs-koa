const { verifyParmsError } = require('../constant/err.type')

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (error) {
            console.error('参数错误', error)
            verifyParmsError.result = error
            ctx.app.emit('error', verifyParmsError, ctx)
            return
        }
        await next()
    }
}

module.exports = { validator }
