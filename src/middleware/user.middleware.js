const xlsx = require('node-xlsx').default
const { findOne, find } = require('../service/user.service')
const {
    userFormateError,
    userRegisterError,
    userAlreadyExists,
    userNameOrPasswordError,
    loginError,
    loginFormaterError,
    deleterUserVerifyError,
    changePasswordError,
    verifyParmsError,
    notIncludedFieldError,
    dontTypeFileError,
    ServiceError,
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
const loginValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
        console.error('用户名或者密码为空', ctx.request.body)
        ctx.app.emit('error', loginFormaterError, ctx)
        return
    }
    await next()
}
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body
    try {
        const res = await find({ username, password: password })
        if (!res.length) {
            console.error('用户名或者密码错误', res, { username, password })
            ctx.app.emit('error', userNameOrPasswordError, ctx)
            return
        }
        ctx.state.user = res[0]
    } catch (error) {
        console.error('登录错误', error)
        ctx.app.emit('error', loginError)
        return
    }
    await next()
}

const verifyDeleteUser = async (ctx, next) => {
    try {
        ctx.verifyParams({
            id: { type: 'string', require: true },
        })
    } catch (error) {
        console.error('传入参数错误', ctx.request.body)
        ctx.app.emit('error', deleterUserVerifyError, ctx)
        return
    }
    await next()
}
const verifyChangePassword = async (ctx, next) => {
    try {
        ctx.verifyParams({
            password: { type: 'string', require: true },
            changePassword: { type: 'string', require: true },
        })
    } catch (error) {
        console.error('传入参数错误', ctx.request.body)
        ctx.app.emit('error', deleterUserVerifyError, ctx)
        return
    }
    await next()
}
const checkPassword = async (ctx, next) => {
    try {
        const username = ctx.state.user.username
        const { password } = ctx.request.body
        const res = await findOne({ username })
        if (res.password !== password) {
            console.error(res, password)
            ctx.app.emit('error', userNameOrPasswordError, ctx)
            return
        }
    } catch (error) {
        console.error('修改密码错误', error)
        ctx.app.emit('error', changePasswordError, ctx)
        return
    }
    await next()
}

const verifyFindPage = async (ctx, next) => {
    try {
        ctx.verifyParams({
            pageNum: { type: 'number', require: true },
            currentPage: { type: 'number', require: true },
        })
    } catch (error) {
        console.error('findPage参数错误', error)
        verifyParmsError.result = error
        ctx.app.emit('error', verifyParmsError, ctx)
        return
    }
    await next()
}
//通用校验函数
const __verifyParams = (ctx, obj) => {
    try {
        ctx.verifyParams(obj)
        return true
    } catch (error) {
        console.error('参数错误', error)
        verifyParmsError.result = error
        ctx.app.emit('error', verifyParmsError, ctx)
        return false
    }
}

const verifyFindUser = async (ctx, next) => {
    const check = __verifyParams(ctx, {
        username: { type: 'string', require: true },
    })
    if (check) await next()
}

const parseUserList = async (ctx, next) => {
    try {
        const filepath = ctx.state.files?.file?.filepath
        if (!filepath) {
            console.error('文件不是xlxs类型')
            ctx.app.emit('error', dontTypeFileError, ctx)
            return
        }
        const list = await xlsx.parse(filepath)[0]
        //校验是否存在3个必须字段
        if (
            !(
                list.data[0].includes('username') &&
                list.data[0].includes('password') &&
                list.data[0].includes('nickname')
            )
        ) {
            ctx.app.emit('error', notIncludedFieldError, ctx)
            return
        }
        //最后传递的数组
        const userlist = []
        //第一列数组搜索返回下标
        const usernameIndex = list.data[0].indexOf('username')
        const passwordIndex = list.data[0].indexOf('password')
        const nicknameIndex = list.data[0].indexOf('nickname')
        //搜索后续的每一列,生成用户对象
        list.data.forEach((item, index) => {
            if (index !== 0) {
                userlist.push({
                    username: item[usernameIndex].toString(),
                    password: item[passwordIndex].toString(),
                    nickname: item[nicknameIndex].toString(),
                    roles: ['user'],
                })
            }
        })
        //用户表传递
        ctx.state.userlist = userlist
    } catch (error) {
        console.error(error)
        ctx.app.emit('error',ServiceError , ctx)
        return
    }
    await next()
}

module.exports = {
    parseUserList,
    verifyFindUser,
    verifyFindPage,
    checkPassword,
    verifyChangePassword,
    userValidator,
    verifyUser,
    verifyLogin,
    loginValidator,
    verifyDeleteUser,
}
