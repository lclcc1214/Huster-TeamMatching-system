Page({
  data: {
    list: [
      {
        pagePath: "/pages/home/home"
      },  
      {
        pagePath: "/pages/team/team"
      },
      {
        pagePath: "/pages/person/person"
      }
    ],
    active: 0,
    changesrc:'/pages/searchShow/searchShow',
    team_info:[],
    team_list:[],
    load_list:[],
    isLoading: false,
    //初始条数
    limit: 3,
    //第一次到达底部
    flag: true,
  },
  onClick(e) {
    this.setData({ active: e.detail });
    let url=this.data.list[e.detail].pagePath
    if(this.data.active === 2)
      url = url + "?owner=" + true
    wx.redirectTo({url})
  },

  focus:function(e){
    const url=this.data.changesrc;
    wx.redirectTo({url})
  },

  
  onLoad(){
    let app = getApp()
    //获取首页队伍id
    console.log("home load")
    wx.request({
      url: 'https://hustbestmatch.club/team/home/teamid',
      method: "GET",
      header:{
        "Authorization": app.globalData.author_token
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status === 0){
          this.setData({
            team_info: [...res.data.info]
          })
          this.getTeamList()
        }
        else{
          wx.showModal({
            title: '警告',
            content: '获取首页队伍失败，请重新加载！',
            showCancel: false,
          })
        }
      }
    });
  },

  getTeamList(){
    //获取首页队伍信息
    this.data.team_info.forEach((item, index)=>{
      console.log(1)
      let app = getApp()
      wx.request({
        url: 'https://hustbestmatch.club/team/myteam/teaminfo',
        method: 'GET',
        header:{
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          team_id: item.id
        },
        success: res=>{
          console.log(res.data)
          let temp_team = res.data.info
          let ddl_time = temp_team.ddl_time
          let date = new Date(new Date(ddl_time).getTime() + 8 * 3600 * 1000)
          
          date = date.toJSON().substring(0, 10)
          console.log('date', date)
          let now_date = new Date().toJSON().substring(0,10)
          console.log('now', now_date)
          console.log(parseInt((new Date(date).getTime() - new Date(now_date).getTime())/(1000*24*60*60)))
          let leftDate = parseInt((new Date(date).getTime() - new Date(now_date).getTime())/(1000*24*60*60))
  
          temp_team.ddl_time = date
          temp_team.leftDate = leftDate
          if(res.data.status === 0){
            if(this.data.team_list.length === index){
              this.setData({
                team_list: [...this.data.team_list,temp_team]
              })
            }
            else if(this.data.team_list.length < index){
              let num = index - this.data. team_list.length
              for(let i = 0; i < num; i++){
                this.setData({
                  team_list: [...this.data.team_list,{}]
                })
              }
              this.setData({
                team_list: [...this.data.team_list,temp_team]
              })
            }
            else{
              let temp_list = [...this.data.team_list]
              temp_list[index] = temp_team
              this.setData({
                team_list: temp_list
              })
            }
            console.log(this.data.team_list)
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取首页队伍信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
    });
  },

  handleSearch(e){
    let input = e.detail;
    if (input) {
      wx.request({
        url: 'http://www.hustbestmatch.club/info',
        data: {
          search: input
        },
        header: {
          //yaogai
          'Content-Type': 'application/json'
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
            wx.redirectTo({
              url: '../searchShow/searchShow?data=' + JSON.stringify(res.data)
            })
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500
      })
    }
  },

  onReachBottom(e){
    if(this.data.flag === true){
      this.setData({
        flag: false
      })
      this.setData({
        limit : 100
      })
    }
  },

  getColors(cb){
    //设置节流阀
    this.setData({
      isLoading: true
    })
    //展示数据加载
    wx.showLoading({
      title: '数据加载中...',
    })
    
    this.setData({
      load_list: [...this.data.load_list, this.data.team_list[this.data.load_list.length]],
      load_list: [...this.data.load_list, this.data.team_list[this.data.load_list.length]],
      load_list: [...this.data.load_list, this.data.team_list[this.data.load_list.length]],
    }),
    wx.hideLoading()
    this.setData({
      isLoading: false
    })
    cb && cb()
  },

});
