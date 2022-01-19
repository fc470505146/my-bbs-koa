const { getConnection } = require('../db/mongodb')

const getLikeAndConection = async () => {
    return await getConnection('likeAndCollection')
}
module.exports = getLikeAndConection 
