const { ObjectId } = require('mongodb')
const { ServiceError } = require('../constant/err.type')
const {
    updateLikeAndCollectionServie,
    updateReviewService,
    findLikeAndCollectionServie,
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
        const { _id}=ctx.state.user
        try {
            const res = await findLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { projection: {[`like.${postId}`]:1}}
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
}

module.exports = new DetailController()
