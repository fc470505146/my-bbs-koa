const { ObjectId } = require('mongodb')
const { ServiceError } = require('../constant/err.type')
const {
    updateLikeAndCollectionServie,
    updateReviewService,
    findLikeAndCollectionServie,
    aggregateLikeAndCollectionServie,
    aggregatePostServie,
    boardAggregate,
    findPostOneServie,
    findReviewOneServie,
} = require('../service/bbs.service')
const winstonLogger = require('../winstonLogger')

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
            winstonLogger.info(
                `${ctx.ip }用户访问首页:` + ctx.state.user.nickname
            )
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
    async getAllNotice(ctx) {
        const user = ctx.state.user
        try {
            const res = await findLikeAndCollectionServie([
                { _id: ObjectId(user._id) },
                {
                    projection: {
                        _id: 0,
                        noticeByPost: 1,
                        noticeByReview: 1,
                    },
                },
            ])
            let noticeByPostPro = [],
                noticeByReviewPro = []
            if (res?.noticeByPost)
                noticeByPostPro = res?.noticeByPost?.map(async (item) => {
                    item.postName = (
                        await findPostOneServie([
                            { _id: item.postId },
                            {
                                projection: {
                                    _id: 0,
                                    title: 1,
                                },
                            },
                        ])
                    ).title
                    item.reviewItem = await findReviewOneServie([
                        { _id: item.reviewId },
                        {
                            projection: {
                                _id: 0,
                                content: 1,
                                quoteId: 1,
                                User: 1,
                                createTime: 1,
                            },
                        },
                    ])
                    if (item.reviewItem?.quoteId !== '0' && item.reviewItem) {
                        item.reviewItem.quoteContent = (
                            await findReviewOneServie([
                                { _id: ObjectId(item.reviewItem?.quoteId) },
                                { projection: { _id: 0, content: 1 } },
                            ])
                        )?.content
                    }
                })
            if (res?.noticeByReview)
                noticeByReviewPro = res?.noticeByReview?.map(async (item) => {
                    item.postName = (
                        await findPostOneServie([
                            { _id: item.postId },
                            {
                                projection: {
                                    _id: 0,
                                    title: 1,
                                },
                            },
                        ])
                    ).title
                    item.reviewItem = await findReviewOneServie([
                        { _id: item.reviewId },
                        {
                            projection: {
                                _id: 0,
                                content: 1,
                                quoteId: 1,
                                User: 1,
                                createTime: 1,
                            },
                        },
                    ])
                    if (item.reviewItem.quoteId !== '0') {
                        item.reviewItem.quoteContent = (
                            await findReviewOneServie([
                                { _id: ObjectId(item.reviewItem.quoteId) },
                                { projection: { _id: 0, content: 1 } },
                            ])
                        ).content
                    }
                })
            await Promise.all([...noticeByPostPro, ...noticeByReviewPro])
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
    async getNoticeNum(ctx) {
        const { _id } = ctx.state.user
        try {
            const res = await findLikeAndCollectionServie([
                {
                    _id: ObjectId(_id),
                },
                {
                    projection: {
                        noticeByReview: 1,
                        noticeByPost: 1,
                    },
                },
            ])
            let Num = 0
            if (res) {
                const noticeByReview = res.noticeByReview ?? []
                const noticeByPost = res.noticeByPost ?? []
                Num +=
                    noticeByReview.reduce(
                        (sum, item) => (sum += item.isCheck ? 0 : 1),
                        0
                    ) +
                    noticeByPost.reduce(
                        (sum, item) => (sum += item.isCheck ? 0 : 1),
                        0
                    )
            }
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: Num },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', ServiceError, ctx)
            return
        }
    }
    async noticeFindOut(ctx) {
        const { _id } = ctx.state.user
        try {
            const res = await updateLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                {
                    $set: {
                        'noticeByPost.$[].isCheck': true,
                        'noticeByReview.$[].isCheck': true,
                    },
                },
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
//处理bug
// async function handleBug() {
//     const temp = await findPostManyServie([{}, { projection: { _id: 1 } }])
//     const noticePostId = await findManyLikeAndCollectionServie([
//         {},
//         {
//             projection: {
//                 _id: 0,
//                 noticeByReview: { postId: 1 },
//                 noticeByPost: { postId: 1 },
//             },
//         },
//     ])
//     console.log(temp)
//     console.log(noticePostId[0])
//     const data = noticePostId[0].noticeByPost
//     const data2 = noticePostId[0].noticeByReview

//     data.forEach(async (item) => {
//         const t = temp.find(
//             (itemPost) => itemPost._id.toString() == item.postId.toString()
//         )
//         if (!t) {
//             console.log('未存在', item)
//             await updateLikeAndCollectionServie([
//                 {},
//                 {
//                     $pull: {
//                         noticeByPost: {
//                             postId: item.postId,
//                         },
//                         noticeByReview: {
//                             postId: item.postId,
//                         },
//                     },
//                 },
//             ])
//         }
//     })
//     data2.forEach((item) => {
//         const t = temp.find(
//             (itemPost) => itemPost._id.toString() == item.postId.toString()
//         )
//         if (!t) {
//             console.log('未存在', item)
//         }
//     })
// }
// handleBug()
//简单的首页缓存层,避免大量读取数据库
let index
async function getIndex() {
    const temp = await boardAggregate([
        { $sort: { priority: -1 } },
        { $limit: 6 },
        { $project: { boardName: 1 } },
    ])
    const arrPromise = temp.map(async (item) => {
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
    await Promise.all(arrPromise)
    index = temp
    setTimeout(getIndex, 1000)
}
getIndex()
//检查index
// function checkIndex(){
//     let i = 0
//     console.log('开始运行');
//     setInterval(() => {
//         if (!index?.[0]?.postList) {
//             console.log(index);
//             console.log(++i)
//         }
//     })
// }
// checkIndex()

module.exports = new DetailController()
