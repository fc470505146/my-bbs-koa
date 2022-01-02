const { addBoardError } = require('../constant/err.type')
const { boardinsertOne } = require('../service/bbs.service')

class bbsController {
    addBoard = async (ctx) => {
        const { boardName, description } = ctx.request.body
        try {
            const res = await boardinsertOne({ boardName, description })
            ctx.body = {
                code: 0,
                status: 200,
                message: '板块创建成功',
                result: { data: res },
            }
        } catch (error) {
            console.error('Board创建失败', error)
            ctx.app.emit('error', addBoardError, ctx)
            return
        }
    }
}

module.exports = new bbsController()
