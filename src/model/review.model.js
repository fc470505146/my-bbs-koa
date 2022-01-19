const { getConnection } = require('../db/mongodb')

const getReview = async () => {
    return await getConnection('review')
}
module.exports = getReview 
