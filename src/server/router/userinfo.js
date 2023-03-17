const express = require('express')

const router = express.Router()

//导入路由处理函数模块
const userInfo_handler = require('../router_handler/userinfo')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证规则对象
const {update_userinfo_schema,update_avatar_schema,update_userinfo_tech_schema} = require('../schema/user')

//获取用户基本信息的路由
router.get('/userinfo',userInfo_handler.getUserInfo)

//获取用户技术栈的路由
router.get('/userinfo/tech',userInfo_handler.getUserTech)

//根据id获取用户技术栈的路由
router.get('/userinfo/techbyid',userInfo_handler.getUserTechById)

//更新用户信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema),userInfo_handler.updateUserInfo)

//删除用户技术栈的路由
router.post('/userinfo/deltech',userInfo_handler.deleteAllTech)

//更新用户技术栈的路由
router.post('/userinfo/tech',expressJoi(update_userinfo_tech_schema),userInfo_handler.updateUserTech)

module.exports = router