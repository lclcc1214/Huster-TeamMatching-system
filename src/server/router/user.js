const express = require('express')

const router = express.Router()

const user_handler = require('../router_handler/user')

//验证数据的中间件
const expressJoi = require('@escook/express-joi')
//验证规则对象
const {reg_login_schema} = require('../schema/user')


//注册新用户
router.post('/reguser',expressJoi(reg_login_schema),user_handler.reguser)

//登录
router.post('/login',expressJoi(reg_login_schema),user_handler.login)

module.exports = router

