// pages/searchShow/searchShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    list:[],
    team_id_list: [],
    limit: 6,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(data) {
    let that = this
    that.setData({
      // list:data.jsonStr,
    })
  },
  handleSearch(e){
    let that = this
    let app = getApp()
    let input = e.detail;
    if (input) {
      that.setData({list:[]})
      wx.request({
        url: 'http://www.hustbestmatch.club/team/home/search',
        header:{
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          inputvalue: input
        },
        success: function(res) {
          if (res.data.msg=='1'){
            wx.showToast({
              title: '无相关结果',
              icon: 'none',
              duration: 1500
            })
          }
          else{
            let team_id_list = res.data.info
            that.setData({
              team_id_list : team_id_list
            })
            for(let i=0; i<team_id_list.length; i++){
              let team_id = team_id_list[i].id
              wx.request({
                url: 'http://www.hustbestmatch.club/team/myteam/teaminfo',
                header:{
                  "Authorization": app.globalData.author_token,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  team_id: team_id
                },
                success: function(res){
                  if(res.data.status === 1){
                    if(res.data.code === 2) return
                  }
                  else {
                    console.log(res.data)
                    let temp_team = res.data.info
                    let ddl_time = temp_team.ddl_time
                    let date = new Date(new Date(ddl_time).getTime() + 8 * 3600 * 1000)
                    
                    date = date.toJSON().substring(0, 10)
                    //console.log('date', date)
                    let now_date = new Date().toJSON().substring(0,10)
                    //console.log('now', now_date)
                    //console.log(parseInt((new Date(date).getTime() - new Date(now_date).getTime())/(1000*24*60*60)))
                    let leftDate = parseInt((new Date(date).getTime() - new Date(now_date).getTime())/(1000*24*60*60))
            
                    temp_team.ddl_time = date
                    temp_team.leftDate = leftDate
                    if(that.data.list.length === i){
                       that.setData({list:[...that.data.list, temp_team]})
                    }
                    else if(that.data.list.length < i){
                      let num = i - that.data.list.length
                      for(let j = 0; j < num; j++){
                        that.setData({
                          list: [...that.data.list, {}]
                        })
                      }
                      that.setData({
                        list: [...that.data.list, temp_team]
                      })
                    }
                    else{
                      let temp_list = [...that.data.list]
                      temp_list[i] = temp_team
                      that.setData({
                        list: temp_list
                      })
                    }
                  }
                }
              })
            }
            // wx.navigateTo({
            //   url: '../searchShow/searchShow?data=' + JSON.stringify(res.data)
            // })
          }
        }
      })
    }
    else {
      that.setData({list:[]})
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500
      })
    }
  },
})