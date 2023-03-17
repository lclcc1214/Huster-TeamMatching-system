// pages/createTeam/createTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_name:"",
    comp_name:"",
    team_desc:"",
    need_list:[],
    showModal: false,
  },
  getTeamName: function(e) {
    console.log(e.detail)
    let team_name = e.detail.value;
    this.setData({
      team_name: team_name
    })
  },
  getCompName: function(e) {
    console.log(e.detail)
    let comp_name = e.detail.value;
    this.setData({
      comp_name: comp_name
    })
  },
  getTeamDesc: function(e) {
    console.log(e.detail)
    let team_desc = e.detail.value;
    this.setData({
      team_desc: team_desc
    })
  },
  addNeed: function(e){
    if(this.data.team_name === "") {
      wx.showToast({
        title: '队伍名称不能为空',
        icon: 'none',
        duration: 1500
      })
    }
    else if(this.data.comp_name === "") {
      wx.showToast({
        title: '竞赛名称不能为空',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      let app = getApp()
      wx.request({
        url: 'http://www.hustbestmatch.club/team/create/teams',
        method: "POST",
        header: {
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          team_name: this.data.team_name,
          comp_name: this.data.comp_name,
          team_req: this.data.team_desc,
          ddl_time: new Date()
        },
        success: function(res) {
          // that.setData({
          //   search: res.data,
          // })
          if (res.data.msg=='无相关结果'){
            wx.showToast({
              title: '无相关结果',
              icon: 'none',
              duration: 1500
            })
          }
          else{
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
            wx.navigateTo({
              // url: '../searchShow/searchShow?data=' + JSON.stringify(res.data)
              url: '/pages/team/team'
            })
          }
        }
      })
    }
  }
})