const jsonwebtoken = require('jsonwebtoken')
const {
    addUser,
    update,
    deleteUserOne,
    aggregate,
    find,
} = require('../service/user.service')
const {
    userRegisterError,
    loginError,
    changePasswordError,
    imageTypeError,
    patchImageError,
    deleteUserError,
    findPageError,
    findUserError,
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
    async deleteUserById(ctx) {
        const { id } = ctx.request.body
        const _id = ObjectId(id)
        let res = null
        try {
            res = deleteUserOne({ _id })
        } catch (error) {
            console.error('用户删除错误', error)
            ctx.app.emit('error', deleteUserError, ctx)
            return
        }
        ctx.body = {
            code: 0,
            status: 200,
            message: '删除成功',
            result: {
                res,
            },
        }
    }
    async findPage(ctx) {
        const { pageNum, currentPage } = ctx.request.body
        try {
            //不知道数据库的具体优化，如果通过这个实现分页感觉性能不太行
            const res = await aggregate([
                { $skip: (currentPage - 1) * pageNum },
                { $limit: pageNum },
            ])
            ctx.body = {
                code: 0,
                status: 200,
                message: '查询成功',
                result: { data: res },
            }
        } catch (error) {
            console.error('User分页查询错误', error)
            ctx.app.emit('error', findPageError, ctx)
            return
        }
    }
    async findUser(ctx) {
        const { username } = ctx.request.body
        try {
            const data = await find({ username: { $regex: username } })
            ctx.body = {
                code: 0,
                status: 200,
                message: '查询成功',
                result: { data },
            }
        } catch (error) {
            console.error('查询用户失败findUser',error);
            ctx.app.emit('error',findUserError , ctx)
            return
        }
    }
}

module.exports = new UserController()
