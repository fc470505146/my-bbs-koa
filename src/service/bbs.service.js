const getBoards = require('../model/board.model')

class bbsService {
    boardinsertOne = async (obj) => {
        const Board =await getBoards()
        const res = await Board.insertOne(obj)
        Board.close()
        return res
    }

    boardAggregate = async (listObj) => {
        const Board =await getBoards()
        const res = await Board.aggregate(listObj).toArray()
        Board.close()
        return res
    }

    boardFindOne = async (obj) => {
        const Board =await getBoards()
        const res = await Board.findOne(obj)
        Board.close()
        return res
    }

    boardFindMany = async (obj) => {
        const Board =await getBoards()
        const res = await Board.findMany(obj).toArray()
        Board.close()
        return res
    }

    boardUpdateasync = async (fliter, obj) => {
        const Board =await getBoards()
        const res = await Board.updateOne(fliter, obj)
        Board.close()
        return res
    }
}

module.exports = new bbsService()
