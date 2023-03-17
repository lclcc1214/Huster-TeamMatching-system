Page({
  data: {
    owner: "true",
    uid: "",
    avatarUrl: "",
    username: "",
    name:"",
    gender:"",
    academy:"",
    phone: "",
    qq: "",
    list: [],
    urllist: [
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
    active: 2,
    activeName:"1",
    changesrc:"/pages/change-info/change-info"
  },
  //切换底部tabs
  onClick(e) {
    this.setData({ active: e.detail });
    const url=this.data.urllist[e.detail].pagePath
    wx.redirectTo({url})
  },
  //进入修改信息页面
  onClick1(e) {
    let url=this.data.changesrc;
    url = url + '?name=' + this.data.name + '&&'
        + 'gender=' + this.data.gender + '&&'
        + 'academy=' + this.data.academy + '&&'
        + 'phone=' + this.data.phone + '&&'
        + 'qq=' + this.data.qq + '&&'
        + 'list=' + JSON.stringify(this.data.list)
    console.log(url)
    wx.navigateTo({url})
  },
  //打开、关闭下拉栏
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onLoad(options){
    let that = this
    let app = getApp()
    if(options.owner === "false"){
      that.setData({
        owner: options.owner,
        uid: options.uid
      })
      wx.request({
        url: 'https://hustbestmatch.club/team/myteam/teaminfo/mateinfo',
        method: "GET",
        header: {
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          team_mate_id: that.data.uid
        },
        success: res=>{
          console.log(res.data)
          if(res.data.status === 0){
            that.setData({
              name: res.data.info.name,
              gender: res.data.info.sex,
              academy: res.data.info.adm_name,
              qq: res.data.info.user_qq,
              phone: res.data.info.user_phone
            })
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取个人信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
      wx.request({
        url: 'https://hustbestmatch.club/info/userinfo/techbyid',
        method: 'GET',
        header:{
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          user_id: that.data.uid
        },
        success: res=>{
          console.log(res.data)
          if(res.data.status === 0){
            this.setData({
              list: res.data.data
            })
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取个人技术栈信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
    }
    else{
      that.data.avatarUrl = app.globalData.userInfo.avatarUrl
      that.data.username = app.globalData.userInfo.nickName
      that.setData({
        avatarUrl: that.data.avatarUrl,
        username: that.data.username
      })
      //获取用户基本信息
      wx.request({
        url: 'https://hustbestmatch.club/info/userinfo',
        method: 'GET',
        header:{
          "Authorization": app.globalData.author_token
        },
        success: res=>{
          if(res.data.status === 0){
            that.setData({
              // username: res.data.username,
              name: res.data.data.name,
              gender: res.data.data.sex,
              academy: res.data.data.adm_name,
              qq: res.data.data.user_qq,
              phone: res.data.data.user_phone
            })
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取个人信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
      //获取用户技术栈
      wx.request({
        url: 'https://hustbestmatch.club/info/userinfo/tech',
        method: 'GET',
        header:{
          "Authorization": app.globalData.author_token
        },
        success: res=>{
          if(res.data.status === 0){
            this.setData({
              list: res.data.data
            })
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取个人信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
    }
    


  }
})