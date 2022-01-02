const { getConnection } = require('../db/mongodb')

const getPosts = async () => {
    return await getConnection('posts')
}
module.exports = getPosts
