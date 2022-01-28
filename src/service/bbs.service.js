const getBoards = require('../model/board.model')
const getLikeAndConection = require('../model/likeAndCollection')
const getPost = require('../model/post.model')
const getReview = require('../model/review.model')

class bbsService {
    //板块操作相关
    boardinsertOne = async (obj) => {
        const Board = await getBoards()
        const res = await Board.insertOne(obj)
        return res
    }

    deleteBoardOne = async (obj) => {
        const Board = await getBoards()
        const res = await Board.deleteOne(obj)
        return res
    }
    boardAggregate = async (listObj) => {
        const Board = await getBoards()
        const res = await Board.aggregate(listObj).toArray()
        return res
    }

    boardFindOne = async (obj) => {
        const Board = await getBoards()
        const res = await Board.findOne(obj)
        return res
    }

    boardFindMany = async (obj) => {
        const Board = await getBoards()
        const res = await Board.find(obj).toArray()
        return res
    }

    updateBoard = async (fliter, obj) => {
        const Board = await getBoards()
        const res = await Board.updateOne(fliter, obj)
        return res
    }
    updateBoardOne = async (list) => {
        const Board = await getBoards()
        const res = await Board.updateOne(...list)
        return res
    }
    async getSingleBoard(list) {
        const Board = await getBoards()
        const res = await Board.aggregate(list).toArray()
        return res[0]
    }
    //帖子操作相关
    async addPost(obj) {
        const Post = await getPost()
        const res = await Post.insertOne(obj)
        return res
    }
    async updatePostSerive(list) {
        const Post = await getPost()
        const res = await Post.updateOne(...list)
        return res
    }
    async updatePostManySerive(list) {
        const Post = await getPost()
        const res = await Post.updateMany(...list)
        return res
    }
    async getPostByPage(list) {
        const Post = await getPost()
        const res = await Post.aggregate(list).toArray()
        return res
    }

    async findPostOneServie(objlist) {
        const Post = await getPost()
        const res = await Post.findOne(...objlist)
        return res
    }
    async aggregatePostServie(objlist) {
        const Post = await getPost()
        const res = await Post.aggregate(objlist).toArray()
        return res
    }
    async findPostManyServie(objlist) {
        const Post = await getPost()
        const res = await Post.find(...objlist).toArray()
        return res
    }
    async findPost(obj) {
        const Post = await getPost()
        const res = await Post.find(obj).toArray()
        return res
    }
    async updateOnePost(filter, data) {
        const Post = await getPost()
        const res = await Post.updateOne(filter, data)
        return res
    }
    async deletePost(data) {
        const Post = await getPost()
        const res = await Post.deleteOne(data)
        return res
    }
    //评论相关
    async insertReview(data) {
        const Review = await getReview()
        const res = await Review.insertOne(data)
        return res
    }

    async findReviewOneServie(list) {
        const Review = await getReview()
        const res = await Review.findOne(...list)
        return res
    }
    async findAllReview(data) {
        const Review = await getReview()
        const res = await Review.find(data).toArray()
        return res
    }

    async deleteReviewService(data) {
        const Review = await getReview()
        const res = await Review.deleteOne(data)
        return res
    }
    async updateReviewService(list) {
        const Review = await getReview()
        const res = await Review.updateOne(...list)
        return res
    }
    async updateReviewManyService(list) {
        const Review = await getReview()
        const res = await Review.updateMany(...list)
        return res
    }
    //个人相关信息
    async addCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.updateOne(...list)
        return res
    }
    async getCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.findOne(...list)
        return res
    }
    async updateLikeAndCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.updateOne(...list)
        return res
    }
    async updateManyLikeAndCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.updateMany(...list)
        return res
    }
    async findLikeAndCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.findOne(...list)
        return res
    }
    async findManyLikeAndCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.find(...list).toArray()
        return res
    }
    async aggregateLikeAndCollectionServie(list) {
        const likeAndConection = await getLikeAndConection()
        const res = await likeAndConection.aggregate(list).toArray()
        return res
    }
}
module.exports = new bbsService()
