(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2854af80"],{"4cea":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"el-upload-contain"},[s("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"0","on-remove":e.handleRemove,"auto-upload":!1,multiple:!1,"http-request":e.uploadFile}},[s("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),s("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.submitUpload}},[e._v("上传到服务器")]),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v(" 上传excel文件必须包含username、password、nickname等字段 ")])],1)],1)},n=[],o=s("1da1"),l=(s("96cf"),s("c24f")),c=s("5c96"),i={name:"UserAddList",methods:{submitUpload:function(){this.$refs.upload.submit()},handleRemove:function(e,t){console.log(e,t)},handlePreview:function(e){console.log(e)},uploadFile:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["l"])(e.file);case 2:s=t.sent,0===s.code&&Object(c["Message"])({showClose:!0,message:s.message,type:"success"});case 4:case"end":return t.stop()}}),t)})))()}}},r=i,u=(s("bff1"),s("2877")),p=Object(u["a"])(r,a,n,!1,null,"4c3ee505",null);t["default"]=p.exports},"84d9":function(e,t,s){},bff1:function(e,t,s){"use strict";s("84d9")}}]);