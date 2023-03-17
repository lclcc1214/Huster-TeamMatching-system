const db = require('../db/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../config')


/**
 * 注册的处理函数
 * @param {*username,password} req 
 * @param {*code:2表示用户名被占用,3表示插入错误} res 
 */
exports.reguser = (req,res) => {
    const userInfo = req.body

    const sql = `select * from users where username=?`

    db.query(sql,userInfo.username,(err,results) =>{
        if(err) return res.cc(err)

        if(results.length>0)
            return res.cc('用户名被占用，请更换其他用户名',2) //code为2表示用户名被占用
        
        //用户名可以使用
        userInfo.password = bcrypt.hashSync(userInfo.password,10)
        console.log(userInfo)

        //插入新用户
        const sql1 = `insert into users set ?`
        db.query(sql1,{username:userInfo.username,password:userInfo.password},(err,results) =>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('注册失败',3)//code为3表示插入错误

            res.cc('注册成功！',0,0)
        })
    })
}


/**
 * 登录的处理函数
 * @param {*username,password} req 
 * @param {*code:2表示未查询到用户信息,3表示密码错误} res 
 */
exports.login = (req,res) => {
    const userInfo = req.body

    const sql = `select * from users where username = ?`

    db.query(sql,userInfo.username, (err,results) =>{
        if(err) return res.cc(err)

        if(results.length !== 1) return res.cc('登录失败！',2)//code等于2表示未查询到用户信息

        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password,results[0].password)
        if(!compareResult) return res.cc('登录失败！',3)//code等于3表示密码错误 

        //在服务端生成Token字符串
        const user = {...results[0],password:''}
        console.log(user)

        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expireIn})
    
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}