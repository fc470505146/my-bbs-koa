const { MongoClient } = require('mongodb')
const { MONGODB_URL, MONGODB_DBNAME } = require('../config')

const client = new MongoClient(MONGODB_URL)
const getConnection = async (collectionName) => {
    await client.connect()
    const db = client.db(MONGODB_DBNAME)
    const collection=db.collection(collectionName)
    collection.close = async () => {
        await client.close()
    }
    return collection
}
module.exports = { getConnection }
