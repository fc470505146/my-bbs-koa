const Router = require('koa-router')
const {
    addBoard,
    deleteBoard,
    findByPage,
    updateBoard,
    addPost,
    getSingleBoardByPage,
    getSingleBoardInfo,
    updatePostOne,
    deletePost,
    addReview,
    getAllReview,
    deleteReview,
    updateReview,
    addCollection,
    delCollection,
    getCollection,
    addRecommend,
    delRecommend,
    getRecommend,
    getPostById,
} = require('../controller/bbs.controller')
const { addLike, delLike, getLike, getPostByUserId, getRecommendByUserId, getCollectionByUserId, getIndex } = require('../controller/detail.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/utils.middleware')

const router = new Router({ prefix: '/bbs' })
//添加板块
router.post(
    '/addBoard',
    validator({
        boardName: 'string',
        description: 'string',
        priority: 'number',
    }),
    auth,
    hadAdminPermission,
    addBoard
)
//删除板块
router.post(
    '/deleteBoard',
    validator({ id: 'string', boardName: 'string' }),
    auth,
    hadAdminPermission,
    deleteBoard
)

//修改板块
router.post(
    '/updateBoard',
    validator({
        _id: 'string',
        boardName: 'string',
        description: 'string',
        priority: 'number',
    }),
    auth,
    hadAdminPermission,
    updateBoard
)
//获取所有板块
router.post(
    '/findByPage',
    validator({ pageNum: 'number', currentPage: 'number' }),
    auth,
    findByPage
)

//添加帖子
router.post(
    '/addPost',
    validator({
        boardId: 'string',
        title: 'string',
        description: 'string',
    }),
    auth,
    addPost
)

//根据板块Id获得该板块的帖子，分页获得
router.post(
    '/getSingleBoard',
    validator({ _id: 'string', pageNum: 'number', currentPage: 'number' }),
    auth,
    getSingleBoardByPage
)
//根据板块Id获得板块信息
router.post(
    '/getSingleBoardInfo',
    validator({ _id: 'string' }),
    auth,
    getSingleBoardInfo
)

router.post('/getPostById', validator({ _id: 'string' }), auth, getPostById)

//修改帖子
router.post(
    '/updatePost',
    validator({ _id: 'string', priority: 'number', title: 'string' }),
    auth,
    hadAdminPermission,
    updatePostOne
)
//删除帖子
router.post(
    '/deletePost',
    validator({ _id: 'string' }),
    auth,
    hadAdminPermission,
    deletePost
)

//评论相关操作

//添加评论
router.post(
    '/review/addReview',
    validator({
        postId: 'string',
        content: 'string',
        quoteId: 'string',
    }),
    auth,
    addReview
)
//因为每个帖子评论一般不会过多，一次全部取回
router.post(
    '/review/getAllReview',
    validator({ postId: 'string' }),
    auth,
    getAllReview
)

//修改评论
router.post(
    '/review/updateReview',
    validator({ _id: 'string', content: 'string' }),
    auth,
    hadAdminPermission,
    updateReview
)
//删除评论
router.post(
    '/review/deleteReview',
    validator({ _id: 'string' }),
    auth,
    hadAdminPermission,
    deleteReview
)

//添加收藏
router.post(
    '/collection/addCollection',
    validator({ postId: 'string' }),
    auth,
    addCollection
)
//删除收藏
router.post(
    '/collection/delCollection',
    validator({ postId: 'string' }),
    auth,
    delCollection
)
//获得全部收藏
router.get('/collection/getCollection', auth, getCollection)
//推荐功能
router.post(
    '/recommend/addRecommend',
    validator({ postId: 'string' }),
    auth,
    addRecommend
)
router.post(
    '/recommend/delRecommend',
    validator({ postId: 'string' }),
    auth,
    delRecommend
)
router.get('/recommend/getRecommend', auth, getRecommend)

//亮了
router.post(
    '/like/addLike',
    validator({postId:'string', reviewId:'string'}),
    auth,
    addLike
)
router.post(
    '/like/delLike',
    validator({postId:'string', reviewId:'string'}),
    auth,
    delLike
)
router.post(
    '/like/getLike',
    validator({postId:'string'}),
    auth,
    getLike
)
//个人界面信息获得
router.post(
    '/user/getPostByUserId',
    validator({ _id: 'string' }),
    auth,
    getPostByUserId
)
router.post(
    '/user/getRecommendByUserId',
    validator({ _id: 'string' }),
    auth,
    getRecommendByUserId
)

router.post(
    '/user/getCollectionByUserId',
    validator({ _id: 'string' }),
    auth,
    getCollectionByUserId
)
//获取首页
router.get(
    '/index',
    auth,
    getIndex 
)

module.exports = router
