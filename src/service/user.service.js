const getUser = require('../model/user.model')

const find = async (obj) => {
    const User = await getUser()
    const result = await User.find(obj).toArray()
    User.close()
    return result
}
const findOne = async (obj) => {
    const User = await getUser()
    const result = await User.findOne(obj)
    User.close()
    return result
}
const addUser = async (obj) => {
    const User = await getUser()
    const result = await User.insertOne(obj)
    User.close()
    return result
}

const update = async (queryCons, opera) => {
    const User = await getUser()
    const result = await User.updateOne(queryCons, opera)
    User.close()
    return result
}

const deleteUserOne = async (obj) => {
    const User = await getUser()
    const result = await User.deleteOne(obj)
    User.close()
    return result
}

const aggregate = async (obj) => {
    const User = await getUser()
    const result = await User.aggregate(obj).toArray()
    User.close()
    return result
}
module.exports = { find, addUser, update, deleteUserOne, findOne, aggregate }
