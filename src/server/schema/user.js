//验证规则的包
const joi = require('joi')

//用户名和密码的验证规则
const username = joi.string().pattern(/[A-Za-z][0-9]{9}/).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义user_id,sex,u_adm_id,user_qq,user_phone,user_nickname的验证规则
const user_id = joi.number().integer().min(1).required()
const sex = joi.any().allow('男','女').required()
const u_adm_id = joi.number().integer().min(1).required()
const adm_name = joi.string().required()
const user_qq = joi.string().pattern(/[0-9]{5,10}/).required()
// const user_phone = joi.string().pattern(/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/).required()
const user_phone = joi.string().pattern(/[0-9]{11}/)
const name = joi.string().min(1).max(10).required()

//定义头像的验证规则
const avatar = joi.string().dataUri().required()

//定义用户技术栈的验证规则
const tech_id = joi.number().min(0).max(37).required()
const tech_level = joi.number().min(0).max(2).required()
const tech_class = joi.string().required()

//注册和登录
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}

//更新用户信息
exports.update_userinfo_schema = {
    //需要对req.body里面的数据进行验证
    body: {
        sex,
        adm_name,
        user_qq,
        user_phone,
        name
    }
}

//更新用户头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}

//更新用户的技术栈
exports.update_userinfo_tech_schema = {
    body:{
        tech_id,
        tech_level,
        tech_class
    }
}