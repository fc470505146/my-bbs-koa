module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        status: 400,
        result: '',
    },
    userRegisterError: {
        code: '10002',
        message: '用户注册错误',
        status: 500,
        result: '',
    },
    userAlreadyExists: {
        code: '10003',
        message: '用户已存在',
        status: 409,
        result: '',
    },
}
