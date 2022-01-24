const { ObjectId } = require('mongodb')
const { ServiceError } = require('../constant/err.type')
const {
    updateLikeAndCollectionServie,
    updateReviewService,
    findLikeAndCollectionServie,
    aggregateLikeAndCollectionServie,
    aggregatePostServie,
    boardAggregate,
} = require('../service/bbs.service')

class DetailController {
    async addLike(ctx) {
        const { reviewId, postId } = ctx.request.body
        const { _id } = ctx.state.user
        try {
            const res = await updateLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { $addToSet: { [`like.${postId}`]: ObjectId(reviewId) } },
                { upsert: true },
            ])
            if (res.modifiedCount || res.upsertedCount) {
                await updateReviewService([
                    { _id: ObjectId(reviewId) },
                    { $inc: { like: 1 } },
                ])
            }
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async delLike(ctx) {
        const { reviewId, postId } = ctx.request.body
        const { _id } = ctx.state.user
        try {
            const res = await updateLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { $pull: { [`like.${postId}`]: ObjectId(reviewId) } },
            ])
            if (res.modifiedCount || res.upsertedCount) {
                await updateReviewService([
                    { _id: ObjectId(reviewId) },
                    { $inc: { like: -1 } },
                ])
            }
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async getLike(ctx) {
        const { postId } = ctx.request.body
        const { _id } = ctx.state.user
        try {
            const res = await findLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { projection: { [`like.${postId}`]: 1 } },
            ])
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async getPostByUserId(ctx) {
        const { _id } = ctx.request.body
        try {
            const res = await aggregatePostServie([
                { $match: { 'User._id': _id } },
                {
                    $project: {
                        boardId: 1,
                        title: 1,
                        recommend: 1,
                        lastModified: 1,
                    },
                },
                { $sort: { lastModified: -1 } },
            ])
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async getRecommendByUserId(ctx) {
        const { _id } = ctx.request.body
        try {
            const res = await aggregateLikeAndCollectionServie([
                { $match: { _id: ObjectId(_id) } },
                {
                    $lookup: {
                        from: 'post',
                        localField: 'recommend',
                        foreignField: '_id',
                        as: 'postList',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        postList: {
                            _id: 1,
                            title: 1,
                            boardId: 1,
                            lastModified: 1,
                            recommend: 1,
                        },
                    },
                },
            ])
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res[0] },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async getCollectionByUserId(ctx) {
        const { _id } = ctx.request.body
        try {
            const res = await aggregateLikeAndCollectionServie([
                { $match: { _id: ObjectId(_id) } },
                {
                    $lookup: {
                        from: 'post',
                        localField: 'collection',
                        foreignField: '_id',
                        as: 'postList',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        postList: {
                            _id: 1,
                            title: 1,
                            boardId: 1,
                            lastModified: 1,
                            recommend: 1,
                        },
                    },
                },
            ])
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res[0] },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async getIndex(ctx) {
        try {
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: index },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
}

//简单的首页缓存层,避免大量读取数据库
let index
async function getIndex() {
    const temp = await boardAggregate([
        { $sort: { priority: -1 } },
        { $limit: 6 },
        { $project: { boardName: 1 } },
    ])
    await new Promise((resolve, reject) => {
        try {
            temp.map(async (item) => {
                item.postList = await aggregatePostServie([
                    { $match: { boardId: item._id } },
                    {
                        $sort: {
                            priority: -1,
                            recommend: -1,
                            lastModified: -1,
                        },
                    },
                    { $limit: 10 },
                    { $project: { title: 1, recommend: 1, lastModified: 1 } },
                ])
            })
            //不能直接赋值,需要排到第二轮异步
            setTimeout(() => (index = temp), 10)
        } catch (error) {
            reject(error)
        }
        resolve()
    })
    setTimeout(getIndex, 5000)
}
getIndex()
//检查index
// function checkIndex(){
//     let i = 0
//     setInterval(() => {
//         if (!index?.[0]?.postList) {
//             console.log(index);
//             console.log(++i)
//         }
//     })
// }
// checkIndex()

module.exports = new DetailController()
