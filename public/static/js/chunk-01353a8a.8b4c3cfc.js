(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01353a8a"],{"1a4a":function(e,t,n){"use strict";n("4c53")},"2c0f":function(e,t,n){"use strict";n("492a")},"492a":function(e,t,n){},"4c53":function(e,t,n){},"7db0":function(e,t,n){"use strict";var s=n("23e7"),i=n("b727").find,a=n("44d2"),r=n("ae40"),c="find",o=!0,u=r(c);c in[]&&Array(1)[c]((function(){o=!1})),s({target:"Array",proto:!0,forced:o||!u},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a(c)},c99d:function(e,t,n){},dd87:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-pagination",{staticStyle:{"text-align":"center"},attrs:{background:"",layout:"prev, pager, next","page-size":e.pagination.pageNum,total:e.pagination.total},on:{"current-change":e.emitChange}})},i=[],a={name:"BasePagination",props:{pagination:Object},methods:{emitChange:function(e){this.$emit("current-change",e)}}},r=a,c=n("2877"),o=Object(c["a"])(r,s,i,!1,null,"aa7fb590",null);t["a"]=o.exports},ddea:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"post-view-wrapper"},[n("post-view-heard",{on:{focus:e.handleClickFocus}}),n("post-view-review",{attrs:{"is-focus":e.isFocus},on:{focus:function(t){e.isFocus=!1}}})],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"post-heard"},[n("div",{staticClass:"post-title"},[n("span",{staticClass:"post-name"},[e._v(e._s(e.currentPost.title))])]),n("div",{staticClass:"post-landlord"},[n("div",{staticClass:"landloard-user"},[n("el-avatar",{key:e.currentPost.User.avatar,attrs:{size:50,src:""+e.currentPost.User.avatar}}),n("div",{staticClass:"landloard-info"},[n("div",[n("span",{staticClass:"nickname"},[n("router-link",{attrs:{to:"/bbs/user/"+e.currentPost.User._id}},[e._v(" "+e._s(e.currentPost.User.nickname))])],1),n("span",{staticClass:"createtime"},[e._v(e._s(e.currentPost.lastModified))])]),n("div",{staticStyle:{"font-size":"14px"}},[e._v(e._s(e.currentPost.title))])])],1),n("div",{staticClass:"post-desc"},[n("el-row",[n("el-col",{attrs:{span:18}},[e._v(" "+e._s(e.currentPost.description))])],1)],1),n("div",{staticClass:"post-button"},[n("span",{class:{"button-recommend":!0,red:e.isRecommend},on:{click:e.handleRecommend}},[n("svg-icon",{attrs:{"icon-class":"recommend"}}),e._v(e._s(e.isRecommend?"已":"")+"推荐("+e._s(e.currentPost.recommend||0)+")")],1),n("span",{staticClass:"el-icon-chat-round",on:{click:e.handleClickFocus}},[e._v("评论")]),n("span",{on:{click:e.handleClickCollection}},[n("svg-icon",{class:{yellow:e.isInCollection},attrs:{"icon-class":"collection"}}),e._v(" "+e._s(e.isInCollection?"已":"")+"收藏")],1)])])])},r=[],c=n("1da1"),o=n("5530"),u=(n("96cf"),n("2f62")),l=n("6646"),d=n("24a3"),p={name:"PostViewHeard",data:function(){return{}},computed:Object(o["a"])({},Object(u["b"])(["currentPost","isInCollection","isRecommend"])),created:function(){this.getCurrentPost()},methods:{getCurrentPost:function(){this.$store.dispatch("bbs/getCurrentPost",this.$route.params.id)},handleRecommend:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.$route.params.id,s=null,!e.isRecommend){t.next=8;break}return t.next=5,Object(d["d"])({postId:n});case 5:s=t.sent,t.next=11;break;case 8:return t.next=10,Object(d["b"])({postId:n});case 10:s=t.sent;case 11:0===s.code&&(e.$store.dispatch("likeAndCollection/getRecommend"),e.$store.dispatch("bbs/getCurrentPost",n));case 12:case"end":return t.stop()}}),t)})))()},handleClickFocus:function(){this.$emit("focus")},handleClickCollection:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=null,!e.isInCollection){t.next=7;break}return t.next=4,Object(l["e"])({postId:e.currentPost._id});case 4:n=t.sent,t.next=10;break;case 7:return t.next=9,Object(l["b"])({postId:e.currentPost._id});case 9:n=t.sent;case 10:0===n.code&&e.$store.dispatch("likeAndCollection/getCollection");case 11:case"end":return t.stop()}}),t)})))()}}},v=p,m=(n("1a4a"),n("2877")),h=Object(m["a"])(v,a,r,!1,null,"1058de2a",null),f=h.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"post-review-wrapper"},[n("div",{staticClass:"review-list"},[e._m(0),e._l(e.reviewListCurrent,(function(t){return n("div",{key:t._id,staticClass:"review-item"},[n("el-avatar",{attrs:{size:40,src:""+t.User.avatar}}),n("div",{staticClass:"item-content"},[n("div",{staticClass:"item-heard"},[n("span",{staticClass:"heard-nickname"},[n("router-link",{attrs:{to:"/bbs/user/"+t.User._id}},[e._v(" "+e._s(t.User.nickname))])],1),n("span",{staticClass:"heard-date"},[e._v(e._s(t.createTime))])]),n("div",{staticClass:"item-content"},["0"!==t.quoteId?n("div",{staticClass:"review-quote"},[n("div",{staticClass:"quote-user"},[e._v(" 引用@"),n("span",{staticClass:"quote-nickname"},[n("router-link",{attrs:{to:"/bbs/user/"+t.quote.User._id}},[e._v(e._s(t.quote.User.nickname))])],1),e._v("发表的发表的: ")]),n("el-row",[n("el-col",{attrs:{span:18}},[e._v(" "+e._s(t.quote.content)+" ")])],1)],1):e._e(),n("el-row",[n("el-col",{attrs:{span:18}},[e._v(" "+e._s(t.content)+" ")]),e.isAdmin?n("el-col",{staticStyle:{"text-align":"center"},attrs:{span:6}},[n("el-button-group",[n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-edit"},on:{click:function(n){return e.handleClickUpdateReview(t)}}},[e._v("修改")]),n("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(n){return e.handleDeleteReview(t._id)}}},[e._v("删除 ")])],1)],1):e._e()],1)],1),n("div",{staticClass:"item-button"},[n("span",{class:{"button-light":!0,red:t.isLight},on:{click:function(n){return e.handleLike(t)}}},[n("span",{staticClass:"el-icon-s-opportunity",staticStyle:{"margin-right":"0"}}),e._v(" 亮了("+e._s(t.like)+")")]),n("span",{staticClass:"button-reply el-icon-connection",on:{click:function(n){return e.handleClickFocus(t._id,t)}}},[e._v("回复")])])])],1)}))],2),n("base-pagination",{attrs:{pagination:e.pagination},on:{"current-change":e.handlePagination}}),n("div",{staticClass:"reply-content"},[n("div",{staticClass:"reply-quote"},[n("div",{staticClass:"quote-title"},[e._v("Re:"+e._s(e.currentPost.title))]),"0"!==e.reviewItem.quoteId?n("div",{staticClass:"review-quote"},[n("div",{staticClass:"quote-user"},[e._v(" 引用@"),n("span",{staticClass:"quote-nickname"},[e._v(e._s(e.quoteItem.User.nickname))]),e._v("发表的发表的: ")]),n("el-row",[n("el-col",{attrs:{span:18}},[e._v(" "+e._s(e.quoteItem.content)+" ")])],1)],1):e._e()]),n("div",{staticClass:"reply-input"},[n("el-input",{ref:"reply",staticStyle:{"margin-top":"10px"},attrs:{autosize:{minRows:3,maxRows:5},type:"textarea",placeholder:"留下你的评论"},on:{blur:function(t){return e.$emit("focus")}},model:{value:e.reviewItem.content,callback:function(t){e.$set(e.reviewItem,"content",t)},expression:"reviewItem.content"}})],1),n("div",{staticClass:"reply-button"},[n("el-button",{attrs:{type:"danger"},on:{click:e.addReview}},[e._v("回复")])],1)]),n("el-dialog",{attrs:{center:!0,title:"修改评论",visible:e.show},on:{"update:visible":function(t){e.show=t}}},[n("el-form",{attrs:{model:e.updateReview}},[n("el-form-item",{attrs:{label:"内容"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.updateReview.content,callback:function(t){e.$set(e.updateReview,"content",t)},expression:"updateReview.content"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.clickShowUpdate}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.clickShowUpdate(),e.subUpdateReview()}}},[e._v("确 定")])],1)],1)],1)},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list-title"},[n("span",{staticClass:"title"},[e._v("全部回帖")])])}],b=(n("fb6a"),n("d81d"),n("7db0"),n("d3b7"),n("dd87")),_=n("5c96"),C=n("c1df"),k=n.n(C);function R(){return{quoteUserId:"0",quoteId:"0",content:""}}var I={name:"PostViewReview",components:{BasePagination:b["a"]},props:{isFocus:Boolean},data:function(){return{user:{avatar:""},pagination:{pageNum:10,total:10,currentPage:1},reviewItem:R(),reviewList:[],quoteItem:{},updateReview:{_id:"",content:""},show:!1}},computed:Object(o["a"])(Object(o["a"])({},Object(u["b"])(["isAdmin","currentPost","isLight"])),{},{reviewListCurrent:function(){var e=this.pagination.currentPage,t=this.pagination.pageNum,n=(e-1)*t,s=e*t;return this.reviewList.slice(n,s)}}),watch:{isFocus:function(){this.isFocus&&(this.reviewItem=R(),this.quoteItem={},this.$refs.reply.focus())}},created:function(){this.getAllReview()},methods:{handleLike:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=null,!e.isLight){n.next=7;break}return n.next=4,Object(d["c"])({postId:e.postId,reviewId:e._id});case 4:s=n.sent,n.next=10;break;case 7:return n.next=9,Object(d["a"])({postId:e.postId,reviewId:e._id});case 9:s=n.sent;case 10:0===s.code&&(t.$store.dispatch("likeAndCollection/getLike",{postId:e.postId}),t.getAllReview());case 11:case"end":return n.stop()}}),n)})))()},subUpdateReview:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=Object(o["a"])({},e.updateReview),t.next=3,Object(l["q"])(n);case 3:s=t.sent,0===s.code&&(Object(_["Message"])({message:"修改成功",type:"success"}),e.getAllReview());case 5:case"end":return t.stop()}}),t)})))()},handleClickUpdateReview:function(e){this.updateReview.content=e.content,this.updateReview._id=e._id,this.show=!0},clickShowUpdate:function(){this.show=!this.show},handleDeleteReview:function(e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(l["h"])({_id:e});case 2:s=n.sent,0===s.code&&(Object(_["Message"])({message:"删除成功",type:"success"}),t.getAllReview());case 4:case"end":return n.stop()}}),n)})))()},handleClickFocus:function(e,t){this.quoteItem=t,this.reviewItem.quoteId=e,this.reviewItem.quoteUserId=t.User._id,this.$refs.reply.focus()},addReview:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=Object(o["a"])(Object(o["a"])({},e.reviewItem),{},{postId:e.$route.params.id,postUserId:e.currentPost.User._id}),t.next=3,Object(l["d"])(n);case 3:s=t.sent,0===(null===s||void 0===s?void 0:s.code)&&(Object(_["Message"])({message:"回复成功",type:"success"}),e.reviewItem=R(),e.quoteItem={},e.getAllReview());case 5:case"end":return t.stop()}}),t)})))()},getAllReview:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["i"])({postId:e.$route.params.id});case 2:n=t.sent,0===n.code&&(n.result.data.map((function(t){"0"!==t.quoteId&&(t.quote=n.result.data.find((function(e){return e._id===t.quoteId}))),t.isLight=e.isLight(t._id),t.createTime=k()(t.createTime).format("MM-DD HH:mm")})),e.reviewList=n.result.data,e.pagination.total=e.reviewList.length);case 4:case"end":return t.stop()}}),t)})))()},handlePagination:function(e){this.pagination.currentPage=e}}},x=I,j=(n("f1ea"),Object(m["a"])(x,w,g,!1,null,"bc629a18",null)),O=j.exports,P={name:"PostView",components:{PostViewHeard:f,PostViewReview:O},data:function(){return{isFocus:!1}},created:function(){this.getConnection()},mounted:function(){},methods:{getConnection:function(){this.$store.dispatch("likeAndCollection/getCollection"),this.$store.dispatch("likeAndCollection/getRecommend"),this.$store.dispatch("likeAndCollection/getLike",{postId:this.$route.params.id})},handleClickFocus:function(){this.isFocus=!this.isFocus}}},y=P,q=(n("2c0f"),Object(m["a"])(y,s,i,!1,null,"7a0bdc3b",null));t["default"]=q.exports},f1ea:function(e,t,n){"use strict";n("c99d")}}]);