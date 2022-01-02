module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名||密码||昵称为空',
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
    userNameOrPasswordError: {
        code: '10004',
        message: '用户名或者密码错误',
        status: 409,
        result: '',
    },
    loginFormaterError: {
        code: '10005',
        message: '用户名或密码不能为空',
        status: 400,
        result: '',
    },
    loginError: {
        code: '10006',
        message: '登录错误',
        status: 500,
        result: '',
    },
    changePasswordError: {
        code: '10007',
        message: '密码修改错误',
        status: 500,
        result: '',
    },
    imageTypeError: {
        code: '10008',
        message: '不被允许的文件类型',
        status: 400,
        result: '',
    },
    patchImageError: {
        code: '10009',
        message: '上传文件失败',
        status: 500,
        result: '',
    },
    deleteUserError: {
        code: '10010',
        message: '用户删除错误',
        status: 500,
        result: '',
    },
    deleterUserVerifyError: {
        code: '10011',
        message: '参数错误',
        status: 400,
        result: '',
    },
    findPageError: {
        code: '10012',
        message: '用户分页查询错误',
        status: 500,
        result: '',
    },
    verifyParmsError: {
        code: '10013',
        message: '参数错误',
        status: 400,
        result: '',
    },
    findUserError: {
        code: '10014',
        message: '查询用户失败',
        status: 500,
        result: '',
    },
    //bbs业务错误
    addBoardError: {
        code: '10201',
        message: '板块添加错误',
        status: 500,
        result: '',
    },
    //用户权限校验
    tokenExpiredError: {
        code: '10101',
        message: 'Token已过期',
        status: 400,
        result: '',
    },
    tokenInvalid: {
        code: '10102',
        message: '无效token',
        status: 400,
        result: '',
    },
    tokenError: {
        code: '10103',
        message: 'token异常',
        status: 400,
        result: '',
    },
    hadAdminErorr: {
        code: '10104',
        message: '用户无管理员权限',
        status: 400,
        result: '',
    },
}
