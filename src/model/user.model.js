const { getConnection } = require('../db/mongodb')

const getUser = async () => {
    return await getConnection('user')
}
module.exports = getUser
