Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    codeText:'获取验证码',
    counting:false,
    login_username:"",
    login_isShow: false,    //运用三目运算法，对最右侧图片进行控制
    login_show:"password",     //初始化input框的类型为password
    login_password:"",

    register_username:"",
    register_isShow1: false,    //运用三目运算法，对最右侧图片进行控制
    register_show1:"password",     //初始化input框的类型为password
    register_password1:"",
    register_isShow2: false,    //运用三目运算法，对最右侧图片进行控制
    register_show2:"password",     //初始化input框的类型为password
    register_password2:"",
    changesrc:"/pages/home/home",

    userInfo:{},
    userInfoStr :''

  },
  // 登陆注册监听
  click(e){
    let index = e.currentTarget.dataset.code === '0'?0:1;
    this.setData({
      current:index
    })
  },
  //获取验证码 
  getCode(){
    var that = this;
    if (!that.data.counting) {
      wx.showToast({
        title: '验证码已发送',
      })
      //开始倒计时60秒
      that.countDown(that, 60);
    } 
  },
  //倒计时60秒
  countDown(that,count){
    if (count == 0) {
      that.setData({
        codeText: '获取验证码',
        counting:false
      })
      return;
    }
    that.setData({
      counting:true,
      codeText: count + '秒后重新获取',
    })
    setTimeout(function(){
      count--;
      that.countDown(that, count);
    }, 1000);
  },
  login_getUsername: function(e) {
    let username = e.detail.value;
    this.setData({
      login_username: username
    })
  },
  register_getUsername: function(e) {
    let username = e.detail.value;
    this.setData({
      register_username: username
    })
  },
  //显示密码或者隐藏密码的图片控住函数
  login_showPassword: function() {
    if (this.data.login_isShow) {   //如果this.data.isShow为true,则表示为密码小黑点
      this.setData({
        login_isShow:false,
        login_show:"password"
      })
    } else {
      this.setData({
        login_isShow: true,
        login_show: "text"
      })
    }
  },
  //密码输入检测
  login_getPassWord: function(e) {
    let password = e.detail.value;
    this.setData({
      login_password: password
    })
  },
  //显示密码或者隐藏密码的图片控制函数
  register_showPassword1: function() {
    if (this.data.register_isShow1) {   //如果this.data.isShow为true,则表示为密码小黑点
      this.setData({
        register_isShow1:false,
        register_show1:"password"
      })
    } else {
      this.setData({
        register_isShow1: true,
        register_show1: "text"
      })
    }
  },
  //密码输入检测
  register_getPassWord1: function(e) {
    let password = e.detail.value;
    console.log(e.detail)
    this.setData({
      register_password1: password
    })
    console.log(this.data.register_password1)
  },
  //显示密码或者隐藏密码的图片控制函数
  register_showPassword2: function() {
    if (this.data.register_isShow2) {   //如果this.data.isShow为true,则表示为密码小黑点
      this.setData({
        register_isShow2:false,
        register_show2:"password"
      })
    } else {
      this.setData({
        register_isShow2: true,
        register_show2: "text"
      })
    }
  },
  //密码输入检测
  register_getPassWord2: function(e) {
    let password = e.detail.value;
    this.setData({
      register_password2: password
    })
  },
  onClick() {
    console.log(this.data.current)
    switch(this.data.current){
      //注册
      case 0:
        console.log('reg')
        if(this.data.register_password1 !== this.data.register_password2){
          return 
        }
        console.log('clicked!')
        wx.request({
          url: 'https://hustbestmatch.club/api/reguser',
          method: 'POST',
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            username: this.data.register_username,
            password: this.data.register_password1
          },
          success: res=>{
            console.log(res.data)
            if(res.data.code === 1){
              wx.showModal({
                title: '警告',
                content: '输入不规范！',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
    
              })
            }
            else if(res.data.code === 2){
              wx.showModal({
                title: '警告',
                content: '用户名被占用，请更换其他用户名！',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
              })
            }
            else if(res.data.code === 3){
              wx.showModal({
                title: '警告',
                content: '注册失败！请稍后再试',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
              })
            }
            else{
              // this.getUserProfile()
              // const url=this.data.changesrc;
              wx.showModal({
                title: '注册成功',
                content: '请返回登陆！',
                showCancel: false,
                confirmText: '确定',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新登录”'); 
                    const url = "/pages/loginRegister/loginRegister"
                    wx.redirectTo({url})
                  }
                }
              })
              
            }
            
          }
        })
        break
      //登录
      case 1:
        console.log('login')
        wx.request({
          url: 'https://hustbestmatch.club/api/login',
          method: 'POST',
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            username: this.data.login_username,
            password: this.data.login_password
          },
          success: res=>{
            console.log(res.data)
            if(res.data.code === 1){
              wx.showModal({
                title: '警告',
                content: '用户名或密码格式错误！',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
              })
            }
            else if(res.data.code === 2){
              wx.showModal({
                title: '警告',
                content: '该用户未注册！',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
              })
            }
            else if(res.data.code === 3){
              wx.showModal({
                title: '警告',
                content: '登录失败！用户名或密码错误',
                showCancel: false,
                confirmText: '重新输入',
                success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                    console.log('用户点击了“重新输入”'); 
                  }
                }
              })
            }
            else{
              let app = getApp()
              app.globalData.author_token = res.data.token
              console.log(app.globalData.author_token)
              this.getUserProfile()
              const url=this.data.changesrc;
              wx.navigateTo({url})
            }
            
          }
        })
        break
    }
    // const url=this.data.changesrc;
    // wx.navigateTo({url})
  },
      
  getUserProfile: function(res) {
    let app = getApp()
    wx.getUserProfile({
      desc: '用于微信账号与平台账号绑定',
      success: (res)=>{
        console.log("获取到的用户信息成功: ",JSON.stringify(res));
        app.globalData.userInfo = res.userInfo, 
        this.setData({
          userInfo: res,
          userInfoStr: JSON.stringify(res)
        })
      },
      fail: (res)=>{
        console.log("获取用户个人信息失败: ",res);
        //用户按了拒绝按钮
        wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                wx.redirectTo({url: '/pages/loginRegister/loginRegister'})
                console.log('用户点击了“返回授权”'); 
              }
            }
        });
      }
    })
  }

})