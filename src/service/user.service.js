const { getdb } = require('./utils')
const collectionName = 'user'
class UserService {
    constructor(db) {
        db.then((db) => {
            this.collection = db.collection(collectionName)
        })
    }
    addUser= async(userInfo)=> {
        this.collection.insertMany([userInfo])
        return "成功"
    }
    findUser = async (username) => { 
        return this.collection.find(username).toArray()
    }
    find = async (data) => { 
        return this.collection.find(data).toArray()
    }
}
module.exports = new UserService(getdb())
