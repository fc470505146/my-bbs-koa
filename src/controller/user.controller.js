const { addUser, findUser,find } = require('../service/user.service')

class UserController {
    async register(ctx) {
        let { username, password, nickname } = ctx.request.body
        //要返回的数据
		const data = { msg: {}, errno: 0 }
		
        const isHave = await findUser({ username })
		if (!isHave.length) {
			const isSuccess = addUser({ username, password, nickname })
			isSuccess
				.then((res) => {
					data.msg = res
				})
				.catch((err) => {
					data.errno = 1
					console.log(err)
				})
		} else { 
			data.errno = 1
			data.msg='用户已存在'
		}
		// 响应数据
        ctx.body = data
	}
	async login (ctx) { 
		let { username, password } = ctx.request.body
		const data = { msg: {}, errno: 0 }
		const isHave = await find({ username, password })
		if (isHave.length) {
			delete isHave[0].password
			data.msg = '登录成功'
			data.data = isHave

		} else { 
			data.msg='登录失败'
			data.errno=1
		}
		ctx.body=data
	}
}

module.exports = new UserController()
