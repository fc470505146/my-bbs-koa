const { getConnection } = require('../db/mongodb')

const getPost = async () => {
    return await getConnection('post')
}
module.exports = getPost
