Page({
  data: {
    avatarUrl: "",
    username: "",
    name:"",
    gender:"",
    academy:"",
    phone: "",
    qq: "",
    list: [
      {
        skilltype:"语言",
        tech_name:"C/C++",
        tech_level:"入门"
      },
      {
        skilltype:"语言",
        tech_name:"C/C++",
        tech_level:"熟练"
      },
      {
        skilltype:"语言",
        tech_name:"C/C++",
        tech_level:"精通"
      },
      {
        skilltype:"语言",
        tech_name:"C/C++",
        tech_level:"入门"
      }
    ],
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
    activename:'1',
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
  onLoad(){
    let that = this;
    let app = getApp()
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
})