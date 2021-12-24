const getUser = require('../model/user.model')

const find = async (obj) => {
    const User = await getUser()
    const result = await User.find(obj).toArray()
    User.close()
    return result
}

const addUser = async (obj) => {
    const User = await getUser()
    const result = await User.insertOne(obj)
    User.close()
    return result
}
module.exports = { find, addUser }
