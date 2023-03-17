//导入数据库操作模块
const db = require('../db/index')

/**
 * 获取用户基本信息的处理函数
 * @param {*无} req 
 * @param {*user_id,username,sex,adm_name,user_qq,user_phone,name} res 
 */
exports.getUserInfo = (req,res) =>{
    
    const sql = `select user_id,username,sex,adm_name,user_qq,user_phone,name from users,academy where users.adm_id = academy.adm_id and user_id = ?`
    db.query(sql,req.auth.user_id,(err,results) =>{
        if(err) return res.cc(err)

        if(results.length !== 1)
            return res.cc('获取用户信息失败！')
        
            res.send({
                status: 0,
                message: '获取用户信息成功',
                data: results[0]
            })
    })
}

/**
 * 获取用户技术栈的处理函数
 * @param {*无} req 
 * @param {*tech_id,tech_level,tech_name,tech_class} res 
 */
exports.getUserTech = (req,res) =>{
    const sql = `select user_tech.tech_id,tech_level,tech_name,tech_class from user_tech,tech where user_tech.tech_id = tech.tech_id and user_id = ? order by tech_level desc`
    db.query(sql,req.auth.user_id,(err,results) =>{
        if(err) res.cc(err)
        res.send({
            status: 0,
            message: '获取用户技术栈成功！',
            data: results
        })
    })
}

/**
 * 根据id获取用户技术栈的处理函数
 * @param {*user_id} req 
 * @param {*tech_id,tech_level,tech_name,tech_class} res 
 */
 exports.getUserTechById = (req,res) =>{
    const sql = `select user_tech.tech_id,tech_level,tech_name,tech_class from user_tech,tech where user_tech.tech_id = tech.tech_id and user_id = ? order by tech_level desc`
    db.query(sql,req.query.user_id,(err,results) =>{
        if(err) res.cc(err)
        res.send({
            status: 0,
            message: '获取用户技术栈成功！',
            data: results
        })
    })
}



/**
 * 更新用户信息的处理函数
 * @param {*sex,name,adm_name,user_qq,user_phone} req 
 * @param {*code:2表示未查询到该学院,3表示出现未知的更新失败} res 
 */
exports.updateUserInfo = (req,res) =>{
    const sql = `select adm_id from academy where adm_name = ?`
    db.query(sql,req.body.adm_name,(err,results) =>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('未查询到该学院！',2)
        const adm_id = results[0].adm_id
        const sql = `update users set ? where user_id=?`
        db.query(sql,[{sex:req.body.sex,name:req.body.name,
            adm_id:adm_id,user_qq:req.body.user_qq,user_phone:req.body.user_phone
        }, req.auth.user_id], (err,results) =>{
            if(err) return res.cc(err)

            if(results.affectedRows !== 1)
                return res.cc('更新用户基本信息失败！',3)

            res.cc('更新用户信息成功！',0,0)
        })
    })
}


/**
 * 删除用户技术栈的处理函数
 * @param {*} req
 * @param {*} res    
 */
exports.deleteAllTech = (req,res) =>{
    const sql = `delete from user_tech where user_id = ?`
    db.query(sql,req.auth.user_id,(err,results) =>{
        if(err) return res.cc(err)
        res.cc('删除成功！',0,0)
    })
}

/**
 * 更新用户技术栈的处理函数
 * @param {*tech_id,tech_level} req 
 * @param {*} res 
 */
exports.updateUserTech = (req,res) =>{
    const sql = `insert into user_tech set user_id = ?,tech_id = ?,tech_level = ?`
    db.query(sql,[req.auth.user_id,req.body.tech_id,req.body.tech_level],(err,results) =>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新用户技术栈失败！',2)
        return res.cc('更新用户技术栈成功！',0,0)
    })
}
