const { avatarDefault } = require('../constant/default')
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
const findOneList = async (query, filter) => {
    const User = await getUser()
    const result = await User.findOne(query, filter)
    User.close()
    return result
}
const addUser = async (obj) => {
    const User = await getUser()
    const result = await User.insertOne(obj)
    return result
}
const findOneOption = async (objlist) => {
    const User = await getUser()
    const result = await User.findOne(...objlist)
    return result
}
const update = async (queryCons, opera) => {
    const User = await getUser()
    const result = await User.updateOne(queryCons, opera)
    return result
}

const updateUserService = async (objlist) => {
    const User = await getUser()
    const result = await User.updateOne(...objlist)
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

const addUserListService = async (list) => {
    const User = await getUser()
    try {
        list.forEach((item) => {
            User.updateOne(
                { username: item.username },
                { $set: { ...item, avatar: avatarDefault } },
                { upsert: true }
            )
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    findOneOption,
    addUserListService,
    find,
    addUser,
    update,
    deleteUserOne,
    findOne,
    aggregate,
    findOneList,
    updateUserService,
}
