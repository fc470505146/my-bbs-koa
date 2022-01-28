const moment = require('moment')
const { ObjectId } = require('mongodb')
const {
    addBoardError,
    deleteBoardError,
    updateBoardError,
    dontFindBoardError,
    findBoardByPageError,
    dontUpdateBoardError,
    alreadyHadBoardError,
    addPostError,
    getSingleBoardErro,
    getSingleBoardInfoErro,
    updatePostError,
    deletePostError,
    ServiceError,
} = require('../constant/err.type')
const {
    deleteBoardOne,
    updateBoard,
    boardAggregate,
    boardFindMany,
    updateBoardOne,
    addPost,
    getSingleBoard,
    getPostByPage,
    boardFindOne,
    findPost,
    updateOnePost,
    deletePost,
    insertReview,
    findAllReview,
    deleteReviewService,
    updateReviewService,
    addCollectionServie,
    getCollectionServie,
    updateLikeAndCollectionServie,
    updatePostSerive,
    findPostOneServie,
} = require('../service/bbs.service')
const { findOneOption } = require('../service/user.service')

class bbsController {
    addBoard = async (ctx) => {
        const { boardName, description, priority } = ctx.request.body
        try {
            //条件插入
            const res = await updateBoardOne([
                { boardName },
                {
                    $setOnInsert: { description, priority },
                },
                { upsert: true },
            ])
            if (!res.upsertedId) {
                ctx.app.emit('error', alreadyHadBoardError, ctx)
                return
            } else {
                ctx.body = {
                    code: 0,
                    status: 200,
                    message: '板块创建成功',
                    result: { data: res },
                }
            }
        } catch (error) {
            console.error('Board创建失败', error)
            ctx.app.emit('error', addBoardError, ctx)
            return
        }
    }
    deleteBoard = async (ctx) => {
        const { id, boardName } = ctx.request.body
        const _id = ObjectId(id)
        try {
            const res = await deleteBoardOne({ _id, boardName })
            if (res.deletedCount) {
                ctx.body = {
                    code: 0,
                    status: 200,
                    message: '删除板块成功',
                    result: { data: res },
                }
            } else {
                ctx.app.emit('error', dontFindBoardError, ctx)
                return
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', deleteBoardError, ctx)
            return
        }
    }
    updateBoard = async (ctx) => {
        const { _id: id, boardName, description, priority } = ctx.request.body
        try {
            const _id = ObjectId(id)
            const res = await updateBoard(
                { _id },
                { $set: { boardName, description, priority } }
            )
            if (res.modifiedCount && res.matchedCount) {
                ctx.body = {
                    code: 0,
                    status: 200,
                    message: '修改板块成功',
                    result: { data: res },
                }
            } else {
                ctx.app.emit('error', dontUpdateBoardError, ctx)
                return
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', updateBoardError, ctx)
            return
        }
    }
    findByPage = async (ctx) => {
        const { pageNum = 20, currentPage = 1 } = ctx.request.body
        try {
            const res = await boardAggregate([
                { $sort: { priority: -1 } },
                { $skip: (currentPage - 1) * pageNum },
                { $limit: pageNum },
            ])
            const total = (await boardFindMany({})).length
            ctx.body = {
                code: 0,
                status: 200,
                message: '查询成功',
                result: { data: res, total },
            }
        } catch (error) {
            console.error('Board分页查询错误', error)
            ctx.app.emit('error', findBoardByPageError, ctx)
            return
        }
    }

    async addPost(ctx) {
        const { boardId, title, description } = ctx.request.body
        const { _id, nickname } = ctx.state.user
        try {
            const obj = {
                title,
                description,
                priority: 0,
                boardId: ObjectId(boardId),
                User: { _id, nickname },
                lastModified: new Date(),
            }
            const res = await addPost(obj)
            ctx.body = {
                code: 0,
                status: 200,
                message: '发帖成功',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', addPostError, ctx)
            return
        }
    }

    async getSingleBoard(ctx) {
        let { _id } = ctx.request.body
        _id = ObjectId(_id)
        const aggregateList = [
            { $match: { _id } },
            {
                $lookup: {
                    from: 'post',
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'postList',
                },
            },
        ]
        try {
            const res = await getSingleBoard(aggregateList)
            //根据时间和优先级进行降序排序
            res.postList.sort((x, y) => {
                if (x.priority != undefined || y.priority != undefined) {
                    return (y.priority ?? 0) - (x.priority ?? 0)
                }
                return y._id.getTimestamp() - x._id.getTimestamp()
            })
            res.postList.map((item) => {
                let { _id } = item
                let createDate = _id.getTimestamp()
                item.createDate = moment(createDate).format('MM-DD HH:mm')
                return item
            })
            ctx.body = {
                code: 0,
                status: 200,
                message: '查询单个板块成功',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getSingleBoardErro, ctx)
            return
        }
    }
    async getSingleBoardByPage(ctx) {
        let { _id, pageNum = 10, currentPage = 1 } = ctx.request.body

        try {
            _id = ObjectId(_id)
            const aggregateList = [
                { $match: { boardId: _id } },
                { $sort: { priority: -1, lastModified: -1 } },
                { $skip: pageNum * (currentPage - 1) },
                { $limit: pageNum },
            ]
            const res = await getPostByPage(aggregateList)
            res.map((item) => {
                item.lastDate = moment(item.lastModified).format('MM-DD HH:mm')
                return item
            })
            const total = (await findPost({ boardId: _id })).length
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res, total },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getSingleBoardErro, ctx)
            return
        }
    }
    async getSingleBoardInfo(ctx) {
        let { _id } = ctx.request.body
        try {
            _id = ObjectId(_id)
            const res = await boardFindOne({ _id })
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getSingleBoardInfoErro, ctx)
            return
        }
    }
    async updatePostOne(ctx) {
        let { _id, title, priority } = ctx.request.body
        _id = ObjectId(_id)

        try {
            const res = await updateOnePost(
                { _id },
                { $set: { title, priority } }
            )
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', updatePostError, ctx)
            return
        }
    }
    async deletePost(ctx) {
        let { _id } = ctx.request.body
        _id = ObjectId(_id)
        try {
            const res = await deletePost({ _id })
            ctx.body = {
                code: 0,
                status: 200,
                message: 'ok',
                result: { data: res },
            }
            if (res.deletedCount) {
                await updateLikeAndCollectionServie([
                    {},
                    {
                        $pull: {
                            noticeByPost: {
                                postId: _id,
                            },
                            noticeByReview: {
                                postId: _id,
                            },
                        },
                    },
                ])
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', deletePostError, ctx)
            return
        }
    }
    async addReview(ctx) {
        let { postId, content, quoteId, quoteUserId, postUserId } =
            ctx.request.body
        const { _id } = ctx.state.user
        try {
            const { nickname, avatar } = await findOneOption([
                { _id: ObjectId(_id) },
                {
                    projection: {
                        nickname: 1,
                        avatar: 1,
                    },
                },
            ])
            const review = {
                postId: ObjectId(postId),
                content,
                quoteId,
                User: { _id: ObjectId(_id), nickname, avatar },
                like: 0,
                createTime: new Date(),
                lastModified: new Date(),
            }
            const res = await insertReview(review)
            if (res.insertedId) {
                await updateLikeAndCollectionServie([
                    { _id: ObjectId(postUserId) },
                    {
                        $addToSet: {
                            noticeByPost: {
                                _id: ObjectId(),
                                postId: ObjectId(postId),
                                reviewId: res.insertedId,
                                isCheck: false,
                            },
                        },
                    },
                    { upsert: true },
                ])
                if (quoteId !== '0') {
                    await updateLikeAndCollectionServie([
                        { _id: ObjectId(quoteUserId) },
                        {
                            $addToSet: {
                                noticeByReview: {
                                    _id: ObjectId(),
                                    postId: ObjectId(postId),
                                    reviewId: res.insertedId,
                                    isCheck: false,
                                },
                            },
                        },
                        { upsert: true },
                    ])
                }
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
    async getAllReview(ctx) {
        let { postId } = ctx.request.body
        try {
            postId = ObjectId(postId)
            const res = await findAllReview({ postId })
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
    async deleteReview(ctx) {
        let { _id } = ctx.request.body
        try {
            _id = ObjectId(_id)
            const res = await deleteReviewService({ _id })
            if (res.deletedCount) {
                await updateLikeAndCollectionServie([
                    {},
                    {
                        $pull: {
                            noticeByPost: {
                                reviewId: _id,
                            },
                            noticeByReview: {
                                reviewId: _id,
                            },
                        },
                    },
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
    async updateReview(ctx) {
        let { _id, content } = ctx.request.body
        try {
            _id = ObjectId(_id)
            const res = await updateReviewService([
                { _id },
                { $set: { content } },
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
    async addCollection(ctx) {
        let { postId } = ctx.request.body
        let { _id } = ctx.state.user
        try {
            const res = await addCollectionServie([
                { _id: ObjectId(_id) },
                { $addToSet: { collection: ObjectId(postId) } },
                { upsert: true },
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
    async delCollection(ctx) {
        let { postId } = ctx.request.body
        let { _id } = ctx.state.user
        try {
            const res = await addCollectionServie([
                { _id: ObjectId(_id) },
                { $pull: { collection: ObjectId(postId) } },
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
    async getCollection(ctx) {
        let { _id } = ctx.state.user
        try {
            const res = await getCollectionServie([
                { _id: ObjectId(_id) },
                { projection: { collection: 1 } },
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
    async addRecommend(ctx) {
        let { postId } = ctx.request.body
        let { _id } = ctx.state.user
        try {
            const res = await updateLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { $addToSet: { recommend: ObjectId(postId) } },
                { upsert: true },
            ])
            if (res.modifiedCount || res.upsertedCount) {
                await updatePostSerive([
                    { _id: ObjectId(postId) },
                    { $inc: { recommend: 1 } },
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
    async delRecommend(ctx) {
        let { postId } = ctx.request.body
        let { _id } = ctx.state.user
        try {
            const res = await updateLikeAndCollectionServie([
                { _id: ObjectId(_id) },
                { $pull: { recommend: ObjectId(postId) } },
            ])
            if (res.modifiedCount || res.upsertedCount) {
                await updatePostSerive([
                    { _id: ObjectId(postId) },
                    { $inc: { recommend: -1 } },
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
    async getRecommend(ctx) {
        let { _id } = ctx.state.user
        try {
            const res = await getCollectionServie([
                { _id: ObjectId(_id) },
                { projection: { _id: 0, recommend: 1 } },
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

    async getPostById(ctx) {
        const { _id } = ctx.request.body
        try {
            const res = await findPostOneServie([{ _id: ObjectId(_id) }])
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

module.exports = new bbsController()
