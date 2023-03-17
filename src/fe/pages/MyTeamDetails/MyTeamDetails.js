import Dialog from '../../dist/dialog/dialog';
Page({
  data: {
    team_id: Number,
    team_name: "",
    comp_name: "",
    team_req: "",
    ddl_time: Date,
    ddl_show: "",
    user_id: 0,
    team_leader_id: 0,
    team_leader_username: "",
    team_mates_id: [],
    //主页队伍 或者是 队长队伍 展示权限
    ChangeAutority: true,
    Stunum: "",
    avtiveindex: 1,
    requireNum: 3,
    memberList: [],
    activeName: "1",
    activeNameReq: "1",
    timeIndex: [0,0,0],
    timeArray: [
      [2022, 2023],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    ],
    timeclassArray: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//1
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],//2
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//3
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],//4
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//5
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],//6
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//7
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//8
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],//9
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//10
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],//11
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],//12
    ],
    requireList: [
      []
    ],
    multiIndex: [0, 0, 0], // 默认值
    multiArray: [
      ['语言', '数据库', "前端", "后端", "版本管理工具", "其他"], // 年级
      ['JAVA', 'C/C++', 'Python', 'C#', 'GO', 'PHP', 'MATLAB'], // 这里对应年级的第一个元素的班级,也就是一年级的班级
      ['入门', '熟练', '精通']
    ],
    classArray: [
      ['JAVA', 'C/C++', 'Python', 'C#', 'GO', 'PHP', 'MATLAB'], // 一年级的班级
      ['Oracle', 'Mysql', 'SQL Server', 'Access', 'TiDB'], // 二年级的班级
      ['HTML', 'CSS', 'JavaScript/TypeScript', 'React/Vue/Angular'],
      ['Struts', 'Spring', 'Maven', 'Spring Cloud', 'Tomcat', 'Mybatis'],
      ['Git', 'SVN', 'CVS', 'HG'],
      ['Windows', 'Linux', 'IOS', 'Android', '机器学习', '算法', '大数据']
    ],
  },

  onLoad(options){
    this.setData({
      team_id: options.team_id - '0',
      ChangeAutority: options.ChangeAutority === "true" ? true : false
    })
    let app = getApp()
    
    //获取用户id
    wx.request({
      url: 'https://hustbestmatch.club/info/userinfo',
      method: "GET",
      header: {
        "Authorization": app.globalData.author_token,
      },
      success: res=>{
        console.log(res.data)
        if(res.data.status === 0){
          this.setData({
            user_id: res.data.data.user_id
          })
        }
        else{
          Dialog.alert({
            title: '警告',
            message: '获取用户id失败，请重新加载！',
          })
        }
      }
    })

    //得到队伍详细信息
    wx.request({
      url: 'https://hustbestmatch.club/team/myteam/teaminfo/detail',
      method: "GET",
      header: {
        "Authorization": app.globalData.author_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        team_id: this.data.team_id
      },
      success: res=>{
        console.log(res.data)
        if(res.data.status === 0){
          this.setData({
            team_name: res.data.info.team_name,
            comp_name: res.data.info.comp_name,
            team_req: res.data.info.team_req,
            ddl_show: res.data.info.ddl_time.substring(0, 10),
            team_leader_id: res.data.info.team_leader_id,
          })
          this.getLeaderInfo()
          this.getMateInfo()
        }
        else{
          Dialog.alert({
            title: '警告',
            message: '加载队伍信息失败，请重新加载！',
          })
        }
      }
    })
  },

  //获得队长信息
  getLeaderInfo(){
    let app = getApp()
    wx.request({
      url: 'https://hustbestmatch.club/team/myteam/teaminfo/mateinfo',
      method: "GET",
      header: {
        "Authorization": app.globalData.author_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        team_mate_id: this.data.team_leader_id
      },
      success: res=>{
        console.log(res.data)
        if(res.data.status === 0){
          this.setData({
            team_leader_username: res.data.info.username,
            memberList: [{
                name: res.data.info.name,
                level: "队长",
                acedemy: res.data.info.adm_name,
            }]
          })
        }
        else{
          Dialog.alert({
            title: '警告',
            message: '加载队长信息失败，请重新加载！',
          })
        }
      }
    })
  },

  //获得队员信息
  getMateInfo(){
    let app = getApp()
    wx.request({
      url: 'https://hustbestmatch.club/team/myteam/teaminfo/mate',
      method: "GET",
      header: {
        "Authorization": app.globalData.author_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        team_id: this.data.team_id
      },
      success: res=>{
        console.log(res.data)
        if(res.data.status === 1 && res.data.code === 2){
          //该队伍中没有其他成员, do nothing
        }
        else if(res.data.status === 0){
          this.setData({
            team_mates_id: res.data.info
          })
          if(res.data.info.length !== 0){
            res.data.info.forEach((item, index)=>{
              wx.request({
                url: 'https://hustbestmatch.club/team/myteam/teaminfo/mateinfo',
                method: "GET",
                header: {
                  "Authorization": app.globalData.author_token,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  team_mate_id: item.team_mate_id
                },
                success: res=>{
                  console.log(res.data)
                  if(res.data.status === 0){
                    if(this.data.memberList.length === index + 1){
                      this.setData({
                        memberList: [...this.data.memberList, {
                            name: res.data.info.name,
                            level: "队员",
                            acedemy: res.data.info.adm_name,
                        }]
                      })
                    }
                    else if(this.data.memberList.length < index + 1){
                      let num = index + 1 - this.data.memberList.length
                      for(let i = 0; i < num; i++){
                        this.setData({
                          memberList: [...this.data.memberList, {}]
                        })
                      } 
                      this.setData({
                        memberList: [...this.data.memberList, {
                            name: res.data.info.name,
                            level: "队员",
                            acedemy: res.data.info.adm_name,
                        }]
                      })
                    }
                    else{
                      let temp_memberList = [...this.data.memberList]
                      temp_memberList[index + 1] = {
                            name: res.data.info.name,
                            level: "队员",
                            acedemy: res.data.info.adm_name,
                      }
                      this.setData({
                        memberList: temp_memberList
                      })
                    }
                  }
                  else{
                    Dialog.alert({
                      title: '警告',
                      message: '加载队员信息失败，请重新加载！',
                    })
                  }
                }
              })
            })
          }
          
        }
        else{
          Dialog.alert({
            title: '警告',
            message: '加载队员id失败，请重新加载！',
          })
        }
      }
    })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onChangeReq(event) {
    this.setData({
      activeNameReq: event.detail,
      avtiveindex: parseInt(event.detail)
    });
    console.log(this.data.avtiveindex)
  },
  bindTimePickerChange(event) {
    this.setData({
      timeIndex: event.detail.value
    })

    const data = {
      timeArray: this.data.timeArray,
      timeIndex: this.data.timeIndex
    }
    let year = data.timeArray[0][data.timeIndex[0]]
    let month = data.timeArray[1][data.timeIndex[1]]
    let day = data.timeArray[2][data.timeIndex[2]]

    let new_ddl_show = year + '-' + month + '-' + day
    let new_ddl_time = new Date(new_ddl_show)
    console.log('new_ddl_show ', new_ddl_show)
    console.log('new_ddl_time ', new_ddl_time)
    this.setData({
      ddl_time: new_ddl_time,
      ddl_show: new_ddl_show,
    })
  },

  // 列改变时触发
  bindTimePickerColumnChange(event) {
    const data = {
      timeArray: this.data.timeArray,
      timeIndex: this.data.timeIndex
    }
    // 获取滚动的是哪一列
    data.timeIndex[event.detail.column] = event.detail.value

    // 遍历 classArray
    this.data.timeclassArray.forEach((item, index) => {
      // 滚动第一列
      if (event.detail.column === 0) {
        // 每次滚动 就把第二列默认设置为第一个
        data.timeIndex[1] = 0
        data.timeIndex[2] = 0
      }
      if (event.detail.column === 1) {
        if (data.timeIndex[1] === index) {
          data.timeArray[2] = item
        }
        data.timeIndex[2] = 0
      }
      this.setData(data)
    })
  },
  bindMultiPickerChange(event) {
    this.setData({
      multiIndex: event.detail.value
    })

    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    let requireList = this.data.requireList;
    let activeindex = this.data.avtiveindex;
    let i = 0,
      flag = 0;
    for (i = 0; i < requireList[activeindex].length; i++) {
      if (requireList[activeindex][i].skill === data.multiArray[1][data.multiIndex[1]]) {
        Dialog.alert({
            title: '添加失败',
            message: '已经添加过此技术',
          })
          .then(() => {
            // on confirm
          })
        flag = 1;
      }
    }
    if (flag === 0) {
      this.data.requireList[activeindex].push({
        skilltype: data.multiArray[0][data.multiIndex[0]],
        skill: data.multiArray[1][data.multiIndex[1]],
        level: data.multiArray[2][data.multiIndex[2]]
      })
      console.log(requireList);
      this.setData({
        requireList: this.data.requireList
      })
    }
  },

  // 列改变时触发
  bindMultiPickerColumnChange(event) {
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    // 获取滚动的是哪一列
    data.multiIndex[event.detail.column] = event.detail.value

    // 遍历 classArray
    this.data.classArray.forEach((item, index) => {
      // 滚动第一列
      if (event.detail.column === 0) {
        // 如果滚动到二年级 则将第二列的班级 替换成二年级对应的班级
        if (data.multiIndex[0] === index) {
          data.multiArray[1] = item
        }
        // 每次滚动 就把第二列默认设置为第一个
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
      }
      if (event.detail.column === 1) {
        data.multiIndex[2] = 0
      }
      this.setData(data)
    })
  },
  //删除技术栈
  deleteSkill(e) {
    let id = e.currentTarget.id;
    let requireList = this.data.requireList;
    let activeindex = this.data.avtiveindex;
    let i = 0;
    for (i = 0; i < requireList[activeindex].length; i++) {
      if (requireList[activeindex][i].skill === id)
        requireList[activeindex].splice(i, 1);
    }
    this.setData({
      requireList: this.data.requireList
    })
  },
  //点击成员姓名
  clickName(e){
    let tid = e.currentTarget.id
    if(tid === '0'){
      tid = this.data.team_leader_id
    }
    else{
      tid = this.data.team_mates_id[tid - 1].team_mate_id
    }
    console.log(tid)
    let url = "/pages/person/person"
    url = url + "?uid=" + tid + "&&"
        + "owner=" + false
    console.log(url)
    wx.navigateTo({url})
  },
  //删除成员
  deleteMember(e) {
    if (this.data.ChangeAutority) {
      Dialog.confirm({
          title: '删除成员',
          message: '确认删除此成员',
        })
        .then(() => {
          let aid = e.currentTarget.id
          if(aid === '0'){
            console.log(666)
            Dialog.alert({
              title: '删除失败',
              message: '不能删除队长！',
            })
          }
          else{
            let del_id = this.data.team_mates_id[aid - 1].team_mate_id
            let app = getApp()
            wx.request({
              url: 'https://hustbestmatch.club/team/delete/mate',
              method: "POST",
              header: {
                "Authorization": app.globalData.author_token,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data:{
                team_id: this.data.team_id,
                team_mate_id: del_id
              },
              success: res=>{
                console.log(res.data)
                if(res.data.status === 0){
                  console.log(1)
                  let memberList = [...this.data.memberList]
                  memberList.forEach((item,index)=>{
                    if(index === (aid - '0')){
                      console.log(memberList[index])
                      memberList.splice(index, 1)
                    }
                  })
                  this.setData({
                    memberList: memberList
                  })
                }
                else{
                  if(res.data.code === 2){
                    Dialog.confirm({
                      title: '删除失败',
                      message: '未查询到该队伍！',
                    })
                  }
                  else if(res.data.code === 3){
                    Dialog.confirm({
                      title: '删除失败',
                      message: '没有删除权限！',
                    })
                  }
                  else{
                    Dialog.confirm({
                      title: '删除失败',
                      message: '未查询到对应列表项！',
                    })
                  }
                }
              }
            })
          }
          
        })
        .catch(() => {
          // on cancel
        });
    }
    else{
      Dialog.alert({
        title: '无权限',
        message: '没有权限删除成员',
      })
      .then(() => {
      })
    }
  },
  //添加成员
  addMember() {
    Dialog.confirm({
        title: '添加成员',
        message: '确认添加此成员',
      })
      .then(() => {
        let app = getApp()
        let Stunum = this.data.Stunum
        if(Stunum === this.data.team_leader_username){
          Dialog.alert({
            title: '添加失败',
            message: '该成员已经是队长',
          })
        }
        else if(Stunum === ""){
          Dialog.alert({
            title: '添加失败',
            message: '输入不能为空',
          })
        }
        else{
          //得到填入的username对应的id
          wx.request({
            url: 'https://hustbestmatch.club/team/myteam/teaminfo/userid',
            method: "GET",
            header: {
              "Authorization": app.globalData.author_token,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              username: Stunum
            },
            success: res =>{
              console.log(res.data)
              if(res.data.status === 0){
                let new_mate_id = res.data.info
                //新增队伍的队员
                wx.request({
                  url: 'https://hustbestmatch.club/team/create/mate',
                  method: "POST",
                  header: {
                    "Authorization": app.globalData.author_token,
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    team_id: this.data.team_id,
                    team_mate_id: new_mate_id
                  },
                  success: res=>{
                    console.log(res.data)
                    if(res.data.status === 0){
                      //获取id对应的用户信息
                      wx.request({
                        url: 'https://hustbestmatch.club/team/myteam/teaminfo/mateinfo',
                        method: "GET",
                        header: {
                          "Authorization": app.globalData.author_token,
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          team_mate_id: new_mate_id
                        },
                        success: res=>{
                          console.log(res.data)
                          if(res.data.status === 0){
                            this.setData({
                              memberList: [...this.data.memberList, {
                                name: res.data.info.name,
                                level: "队员",
                                acedemy: res.data.info.adm_name,
                              }]
                            })
                            Dialog.alert({
                              title: '成功',
                              message: '添加队员成功！',
                            })
                          }
                          else{
                            Dialog.alert({
                              title: '警告',
                              message: '更新队伍队员信息失败，请重新加载！',
                            })
                          }
                        }
                      })
                    }
                    else{
                      if(res.data.code === 2){
                        Dialog.alert({
                          title: '添加失败',
                          message: '该队伍不存在',
                        })
                      }
                      else if(res.data.code === 3){
                        Dialog.alert({
                          title: '添加失败',
                          message: '权限不足',
                        })
                      }
                      else if(res.data.code === 4){
                        Dialog.alert({
                          title: '添加失败',
                          message: '不能添加自己',
                        })
                      }
                      else if(res.data.code === 5){
                        Dialog.alert({
                          title: '添加失败',
                          message: '未查询到该用户的信息',
                        })
                      }
                      else if(res.data.code === 6){
                        Dialog.alert({
                          title: '添加失败',
                          message: '该成员已经在队伍中',
                        })
                      }
                      else{
                        Dialog.alert({
                          title: '添加失败',
                          message: '插入失败',
                        })
                      }
                    }
                  }
                })
              }
              else{
                Dialog.alert({
                  title: '添加失败',
                  message: '该成员不存在',
                })
              }
            }
          })


        }
        this.setData({
          Stunum: ""
        })
        })
      .catch(() => {
        // on cancel
      });
  },
  //删除需求
  deleteRequire(event) {
    Dialog.confirm({
        title: '删除需求',
        message: '确认删除此需求',
      })
      .then(() => {
        let activeindex = this.data.avtiveindex;
        let requireList = this.data.requireList;
        requireList.splice(activeindex, 1);
        this.setData({
          requireList: this.data.requireList,
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  //添加需求
  addReq() {
    let requireList = this.data.requireList;
    requireList.push([]);
    this.setData({
      requireList: this.data.requireList
    })
    console.log(this.data.requireList)
  },
  //删除队伍
  deleteTeam(){
    let app = getApp()
    Dialog.confirm({
      title: '解散队伍',
      message: '是否解散此队伍',
    })
    .then(() => {
      wx.request({
        url: 'https://hustbestmatch.club/team/delete/teams',
        method: "POST",
        header: {
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          team_id: this.data.team_id
        },
        success: res=>{
          console.log(res.data)
          if(res.data.status === 0){
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
            wx.redirectTo({url: '/pages/team/team'})
          }
          else{
            Dialog.alert({
              title: '警告',
              message: '删除队伍失败！',
            })
          }
          
        }
      })
    })
    .catch(() => {
      // on cancel
    });
  },
  //退出队伍
  dropTeam(){
    let app = getApp()
    Dialog.confirm({
      title: '退出队伍',
      message: '是否退出此队伍',
    })
    .then(() => {
      wx.request({
        url: 'https://hustbestmatch.club/team/drop/teams',
        method: "POST",
        header: {
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          team_id: this.data.team_id
        },
        success: res=>{
          if(res.data.status === 0){
            wx.showToast({
              title: '退出成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
            wx.redirectTo({url: '/pages/team/team'})
          }
          else{
            Dialog.alert({
              title: '警告',
              message: '退出队伍失败！',
            })
          }
        }
      })
    })
    .catch(() => {
      // on cancel
    });
  },
});