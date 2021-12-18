const { MongoClient } = require('mongodb')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'myBBS'
async function getdb() {
	await client.connect()
	const db = client.db(dbName)
	return db	
}

module.exports = { getdb }
