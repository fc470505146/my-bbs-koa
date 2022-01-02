const { getConnection } = require('../db/mongodb')

const getBoards = async () => {
    return await getConnection('boards')
}
module.exports = getBoards
