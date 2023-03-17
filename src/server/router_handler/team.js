//导入数据库操作模块
const db = require("../db/index");

const algorithm = require("../../Data Structure and Algorithm/js/algorithm");

/**
 * 首页队伍id的处理函数
 * @param {*无} req
 * @param {*info:一个list，每一项包含队伍id和算法的得分} res
 */
exports.getHomeTeamId = (req, res) => {
  const sql1 = `select req_id,teams.team_id,tech_id,tech_level,UNIX_TIMESTAMP(ddl_time) ddl_time from team_request,teams where teams.team_id = team_request.team_id  order by teams.team_id`;
  const sql2 = `select * from user_tech where user_id = ?`;
  db.query(sql1, (err, results) => {
    if (err) return res.cc(err);
    let team_request = results;
    let user_tech;
    db.query(sql2, req.auth.user_id, (err, results) => {
      if (err) return res.cc(err);
      user_tech = results;
      res.send({
        status: 0,
        message: "请求成功！",
        info: algorithm.sort_teams(team_request, user_tech),
      });
    });
  });
};

/**
 * 搜索队伍的处理函数
 * @param {*inputvalue:string} req
 * @param {*info:一个list,每一项包含队伍id和算法的得分} res
 */
exports.getSearchId = (req, res) => {
  const sql1 = `select team_id,team_name,comp_name,UNIX_TIMESTAMP(ddl_time),UNIX_TIMESTAMP(com_time_ddl) from teams,competitions where teams.comp_id = competitions.comp_id`;
  db.query(sql1, (err, results) => {
    if (err) return res.cc(err);
    const key = req.query.inputvalue;
    res.send({
      status: 0,
      message: "请求成功！",
      info: algorithm.search_teams(results, key),
    });
  });
};

/**
 * 得到加入的所有队伍id的处理函数
 * @param {*无} req
 * @param {*info:list,每一项为一个队伍id} res
 */
exports.getTeamId = (req, res) => {
  const sql = `select team_id from teams where team_leader_id = ?`;
  let team_list = [];
  //查询自己创建的队伍
  db.query(sql, req.auth.user_id, (err, results) => {
    if (err) return res.cc(err);
    team_list = [...results];
    const sql = `select team_id from team_mate where team_mate_id =?`;
    db.query(sql, req.auth.user_id, (err, results) => {
      if (err) return res.cc(err);
      team_list = [...team_list, ...results];
      const id_list = [];
      for (let i = 0; i < team_list.length; i++) {
        id_list.push(team_list[i].team_id);
      }
      res.send({
        status: 0,
        message: "获取成功",
        info: id_list,
      });
    });
  });
};

/**
 * 得到队伍相关信息的处理函数
 * @param {*team_id} req
 * @param {*team_name,comp_name,ddl_time} res
 */
exports.getTeamInfo = (req, res) => {
  const sql = `select team_name,comp_name,ddl_time from teams,competitions where teams.comp_id = competitions.comp_id and team_id =?`;
  db.query(sql, req.query.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("不存在该队伍！", 2);
    res.send({
      status: 0,
      message: "获取队伍信息成功！",
      info: results[0],
      team_id: req.query.team_id,
    });
  });
};

/**
 * 得到队伍详细信息的处理函数
 * @param {*team_id} req
 * @param {*team_name,comp_name,team_leader_id,team_req,ddl_time} res
 */
exports.getTeamInfoDetail = (req, res) => {
  const sql = `select team_name,comp_name,team_leader_id,team_req,ddl_time from teams,competitions where teams.comp_id = competitions.comp_id and team_id =?`;
  db.query(sql, req.query.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("查询失败", 2);
    res.send({
      status: 0,
      message: "查询成功！",
      info: results[0],
    });
  });
};

/**
 * 根据用户名得到用户id的处理函数
 * @param {*username} req
 * @param {*info:team_mate_id} res
 */
exports.getUserId = (req, res) => {
  const sql = `select user_id from users where username =?`;
  db.query(sql, req.query.username, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该用户！", 2);
    res.send({
      status: 0,
      message: "查询成功！",
      info: results[0].user_id,
    });
  });
};

/**
 * 得到队伍队员id的处理函数
 * @param {*team_id} req
 * @param {*info:list,每一项是包含team_mate_id属性的json} res
 */
exports.getTeamMateId = (req, res) => {
  const sql = `select team_mate_id from team_mate where team_id =?`;
  db.query(sql, req.query.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length < 1)
      return res.cc("不存在该队伍或该队伍中没有其他成员！", 2);
    res.send({
      status: 0,
      message: "查询队员信息成功！",
      info: results,
    });
  });
};

/**
 * 根据id获得队员详细信息的处理函数
 * @param {*team_mate_id} req
 * @param {*info:username,sex,name,use_qq,user_phone,adm_name} res
 */
exports.getTeamMateInfo = (req, res) => {
  const sql = `select username,sex,name,user_qq,user_phone,adm_name from users,academy where users.adm_id = academy.adm_id and user_id = ?`;
  db.query(sql, req.query.team_mate_id, (err, results) => {
    console.log(results);
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("查询失败！", 2);
    res.send({
      status: 0,
      message: "查询成功！",
      info: results[0],
    });
  });
};

/**
 * 根据技术栈的名称获得技术的Id的处理函数
 * @param {*tech_name} req
 * @param {*tech_id} res
 */
exports.getTechId = (req, res) => {
  const sql = `select tech_id from tech where tech_name =?`;
  db.query(sql, req.query.tech_name, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) res.cc("没有查询到该技能！", 2);
    res.send({
      status: 0,
      message: "查询成功！",
      info: results[0],
    });
  });
};

/**
 * 得到需求id的处理函数
 * @param {*team_id} req
 * @param {*req_id对象的list} res
 */
exports.getRequestId = (req, res) => {
  const sql = `select req_id from team_request where team_id =?`;
  db.query(sql, req.query.team_id, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "查询需求id成功！",
      info: results,
    });
  });
};

/**
 * 根据需求id得到需求信息的处理函数
 * @param {*req_id} req
 * @param {*tech_class,tech_name,tech_level} res
 */
exports.getRequestInfo = (req, res) => {
  const sql = `select tech_class,tech_name,tech_level from team_request_tech,tech where team_request.tech_id = tech.tech_id and req_id=?`;
  db.query(sql, req.query.req_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("查询失败！", 2);
    res.send({
      status: 0,
      message: "查询用户需求成功！",
      info: results[0],
    });
  });
};

/**
 * 创建队伍的处理函数
 * @param {*team_name,team_req,comp_name,ddl_time} req
 * @param {*team_id} res
 */
exports.createTeam_teams = (req, res) => {
  const sql = `select * from teams where team_name = ?`;
  db.query(sql, req.body.team_name, (err, results) => {
    if (err) return res.cc(err);
    if (results.length > 0) return res.cc("队名已经被占用", 2);
    //队名可以使用，队长不用判断，因为只有登录进去才能看到自己的队伍，说明肯定是注册过的
    const teamInfo = req.body;
    //先判断比赛是否存在，如果不存在则插入比赛中
    const sql = `select * from competitions where comp_name =?`;
    db.query(sql, teamInfo.comp_name, (err, results) => {
      if (err) return res.cc(err);
      //没有该竞赛，直接插入
      if (results.length !== 1) {
        const sql = `insert into competitions set ?`;
        db.query(sql, { comp_name: teamInfo.comp_name }, (err, results) => {
          if (err) return res.cc(err);
          if (results.affectedRows !== 1) return res.cc("插入比赛失败！", 2);
          const sql = `select comp_id from competitions where comp_name =?`;
          //查询比赛id
          db.query(sql, teamInfo.comp_name, (err, results) => {
            if (err) return res.cc(err);
            const sql1 = `insert into teams set?`;
            const comp_id = results[0].comp_id;
            db.query(
              sql1,
              {
                team_name: teamInfo.team_name,
                team_leader_id: req.auth.user_id,
                team_req: teamInfo.team_req,
                comp_id: comp_id,
                ddl_time: teamInfo.ddl_time,
              },
              (err, results) => {
                if (err) return res.cc(err);
                if (results.affectedRows !== 1) return res.cc("插入错误", 3);
                //创建成功
                //需要查询team_id 并返回给前端。前端需要把id存到本地
                db.query(
                  `select team_id from teams where team_name = ?`,
                  req.body.team_name,
                  (err, results) => {
                    if (err) return res.cc(err);
                    res.send({
                      status: 0,
                      message: "插入teams表成功！",
                      info: results[0].team_id,
                    });
                  }
                );
              }
            );
          });
        });
      } else {
        const sql = `select comp_id from competitions where comp_name =?`;
        //查询比赛id
        db.query(sql, teamInfo.comp_name, (err, results) => {
          if (err) return res.cc(err);
          const sql1 = `insert into teams set?`;
          const comp_id = results[0].comp_id;
          db.query(
            sql1,
            {
              team_name: teamInfo.team_name,
              team_leader_id: req.auth.user_id,
              team_req: teamInfo.team_req,
              comp_id: comp_id,
              ddl_time: teamInfo.ddl_time,
            },
            (err, results) => {
              if (err) return res.cc(err);
              if (results.affectedRows !== 1) return res.cc("插入错误", 3);
              //创建成功
              //需要查询team_id 并返回给前端。前端需要把id存到本地
              db.query(
                `select team_id from teams where team_name = ?`,
                req.body.team_name,
                (err, results) => {
                  if (err) return res.cc(err);
                  res.send({
                    status: 0,
                    message: "插入teams表成功！",
                    info: results[0].team_id,
                  });
                }
              );
            }
          );
        });
      }
    });
  });
};

/**
 * 新增队伍的队员的处理函数
 * @param {*team_id,tean_mate_id} req
 * @param {*code:2表示未查询到队伍，3表示权限不够，4表示添加失败} res
 */
exports.createTeam_mates = (req, res) => {
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    if (req.body.team_mate_id === req.auth.user_id) {
      return res.cc("不能添加自己！", 4);
    }
    const sql = `select * from users where user_id = ?`;
    db.query(sql, req.body.team_mate_id, (err, results) => {
      if (err) return res.cc(err);
      if (results.length !== 1) return res.cc("未查询到队员的信息", 5);
      //队员都已经登记
      //检测队员是否重复登记
      const sql1 = `select * from team_mate where team_id =?`;
      db.query(sql1, req.body.team_id, (err, results) => {
        if (err) return res.cc(err);
        for (let i = 0; i < results.length; i++) {
          if (req.body.team_mate_id === results[i].team_mate_id)
            return res.cc("该队员已经添加过了！", 6);
        }
        const sql2 = `insert into team_mate set ?`;
        db.query(
          sql2,
          {
            team_id: req.body.team_id,
            team_mate_id: req.body.team_mate_id,
          },
          (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc("插入失败", 6);
            res.send({
              status: 0,
              team_mate_id: req.body.team_mate_id,
              message: "插入成功！",
            });
          }
        );
      });
    });
  });
};
/**
 * 修改ddl的路由
 * @param {*team_id,ddl_time} req 
 * @param {*code:2表示没有查询到队伍，3表示权限不够，4表示更新失败} res 
 */
exports.updateTeam_ddlTime = (req,res) =>{
  //const sql = `update teams set ? where team_id =?`
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    const sql = `update teams set ? where team_id =?`
    db.query(sql,[{ddl_time:req.body.ddl_time},req.body.team_id],(err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !== 1)
        return res.cc('更新截止时间失败！',4)
      res.cc('更新截止时间成功！',0,0)
    })
  })
}

/**
 *创建需求的处理函数
 * @param {*team_id} req
 * @param {*code:2表示未查询到队伍，3表示权限不够，4表示添加失败} res
 */
exports.createTeam_request = (req, res) => {
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    const sql = `insert into team_request set ?`;
    db.query(sql, { team_id: req.body.team_id }, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("添加失败！", 4);
      res.send({
        status: 0,
        message: "插入需求成功！",
      });
    });
  });
};

/**
 * 创建技术栈需求的处理函数
 * @param {*req_id,team_id,tech_level,tech_class} req
 * @param {*code:2表示未查询到该队伍，3表示权限不够，4表示已经添加过改技术栈，5表示添加失败} res
 */
exports.createTeamTech_request = (req, res) => {
  //team_id不需要重复搜索，前端传入的应该是存在本地的team_id
  //tech_id和tech_level会经过校验，但是同一个队伍不该有多个相同的tech_id
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    const sql = `select tech_id from team_request_tech where team_id =?`;
    db.query(sql, req.body.team_id, (err, results) => {
      if (err) return res.cc(err);
      for (let i = 0; i < results.length; i++) {
        if (req.body.tech_id === results[i].tech_id) {
          return res.cc("已经添加过改技术栈！", 4);
        }
      }
      //符合规范
      const sql1 = `insert into team_request_tech set ?`;
      db.query(
        sql1,
        {
          team_id: req.body.team_id,
          tech_id: req.body.tech_id,
          tech_level: req.body.tech_level,
          tech_class: req.body.tech_class,
        },
        (err, results) => {
          if (err) return res.cc(err);
          if (results.affectedRows !== 1) return res.cc("添加失败！", 5);
          res.send({
            status: 0,
            message: "插入需求成功！",
          });
        }
      );
    });
  });
};

/**
 * 删除队员的处理函数
 * @param {*team_id,team_mate_id} req
 * @param {*code:2表示未查询到该队伍，3表示权限不够，4表示删除了自己,5表示未查询到对应列表项} res
 */
exports.deleteTeam_mates = (req, res) => {
  //删除队员，只需要队伍id和删除的队员id即可
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    if (req.body.team_mate_id === req.auth.user_id)
      return res.cc("不能删除自己", 4);
    const sql = `select * from team_mate where team_id = ? and team_mate_id = ?`;
    db.query(sql, [req.body.team_id, req.body.team_mate_id], (err, results) => {
      if (err) return res.cc(err);
      if (results.length < 1) return res.cc("未查询到对应的列表项", 5);
      //查询成功
      const sql1 = `delete from team_mate where team_id = ? and team_mate_id = ?`;
      db.query(
        sql1,
        [req.body.team_id, req.body.team_mate_id],
        (err, results) => {
          if (err) return res.cc(err);
          res.cc("删除成功！", 0, 0);
        }
      );
    });
  });
};

/**
 * 删除需求的处理函数
 * @param {*team_id,req_id} req
 * @param {*code:2表示未查询到该队伍，3表示权限不够,4表示未查询到该需求} res
 */
exports.deleteTeam_request = (req, res) => {
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    const sql = `select * from team_request where team_id =? and req_id =?`;
    db.query(sql, [req.body.team_id, req.body.req_id], (err, results) => {
      if (err) return res.cc(err);
      if (results.length !== 1) return res.cc("未查询到该需求", 4);
      const sql = `delete from team_request where team_id =? and req_id =?`;
      db.query(sql, [req.body.team_id, req.body.req_id], (err, results) => {
        if (err) return res.cc(err);
        res.cc("删除成功！", 0, 0);
      });
    });
  });
};

/**
 * 删除技术栈需求的处理函数
 * @param {*team_id,tech_id} req
 * @param {*code:2表示未查询到该队伍，3表示权限不够,4表示未查询到该需求} res
 */
exports.deleteTeamTech_request = (req, res) => {
  //需要传入的参数是team_id和tech_id，因为这两个参数不会同时相同，这样就不用客户端先获取req_id了
  const sql = `select team_leader_id from teams where team_id =?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("未查询到该队伍！", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("权限不够！", 3);
    const sql = `select * from team_request where team_id =? and tech_id =?`;
    db.query(sql, [req.body.team_id, req.body.tech_id], (err, results) => {
      if (err) return res.cc(err);
      if (results.length !== 1) return res.cc("未查询到该需求", 4);
      //查询需求的条目
      const sql1 = `delete from team_request_tech where team_id =? and tech_id =?`;
      db.query(sql1, [req.body.team_id, req.body.tech_id], (err, results) => {
        if (err) return res.cc(err);
        res.cc("删除成功！", 0, 0);
      });
    });
  });
};

/**
 * 删除队伍的处理函数
 * @param {*team_id} req
 * @param {*code:2表示未查询到该队伍，3表示权限不够} res
 */
exports.deleteTeams = (req, res) => {
  //删除队伍只需要提供队伍id就可以了，在创建队伍的时候会将队伍id回传，不过需要确认对方的权限
  const sql = `select team_leader_id from teams where team_id = ?`;
  db.query(sql, req.body.team_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("该队伍不存在", 2);
    if (results[0].team_leader_id !== req.auth.user_id)
      return res.cc("只有队长才有权限解散队伍", 3);
    //删除和该队伍有关的成员以及需求
    const sql1 = `delete from team_mate where team_id = ?`;
    const sql2 = `delete from team_request where team_id = ?`;
    const sql3 = `delete from team_request_tech where team_id = ?`;
    const sql4 = `delete from teams where team_id =?`;

    db.query(sql1, req.body.team_id, (err, results) => {
      if (err) return res.cc(err);
      db.query(sql2, req.body.team_id, (err, results) => {
        if (err) return res.cc(err);
        db.query(sql3, req.body.team_id, (err, results) => {
          if (err) return res.cc(err);
          db.query(sql4, req.body.team_id, (err, results) => {
            if (err) return res.cc(err);
            res.cc("删除队伍成功！", 0, 0);
          });
        });
      });
    });
  });
};

/**
 * 退出队伍的处理函数
 * @param {*team_id} req
 * @param {*} res
 */
exports.dropOut_team = (req, res) => {
  const sql = `delete from team_mate where team_mate_id = ? and team_id = ?`;
  db.query(sql, [req.auth.user_id, req.body.team_id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败！", 2);
    res.cc("退出队伍成功！", 0, 0);
  });
};
