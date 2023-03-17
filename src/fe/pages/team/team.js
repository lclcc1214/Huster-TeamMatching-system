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
    active: 1,
    team_id: [],
    team_list: [],
  },
  onClick(e) {
    this.setData({ active: e.detail })
    let url=this.data.list[e.detail].pagePath
    if(this.data.active === 2)
      url = url + "?owner=" + true
    wx.redirectTo({url})
  },
  clickAdd(){
    const url = "/pages/createTeam/createTeam"
    wx.navigateTo({url})
  },

  onLoad(){
    let app = getApp()
    wx.request({
      url: 'https://hustbestmatch.club/team/myteam/teaminfo/id',
      method: "GET",
      header: {
        "Authorization": app.globalData.author_token
      },
      success: res=>{
        console.log(res.data);
        if(res.data.status === 0){
          this.setData({
            team_id: [...res.data.info]
          })
          console.log(this.data.team_id)
          this.getTeamList()
        }
        else{
          wx.showModal({
            title: '警告',
            content: '获取我的队伍失败，请重新加载！',
            showCancel: false,
          })
        }
      }
    })

  },

  getTeamList(){
    this.data.team_id.forEach((item, index)=>{
      let app = getApp()
      console.log("index:", index)
      console.log("item:", item)
      wx.request({
        url: 'https://hustbestmatch.club/team/myteam/teaminfo',
        method: "GET",
        header: {
          "Authorization": app.globalData.author_token,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          team_id: item
        },
        success: res=>{
          console.log(res.data)
          if(res.data.status === 0){
            if(this.data.team_list.length === index){
              this.setData({
                team_list: [...this.data.team_list, res.data.info]
              })
            }
            else if(this.data.team_list.length < index){
              let num = index - this.data.team_list.length
              for(let i = 0; i < num; i++){
                this.setData({
                  team_list: [...this.data.team_list, {}]
                })
              }
              this.setData({
                team_list: [...this.data.team_list, res.data.info]
              })
            }
            else{
              let temp_list = [...this.data.team_list]
              temp_list[index] = res.data.info
              // for(let i=0;i<temp_list.length;i++){
              //   if(i === index){
              //     temp_list[i] = res.data.info
              //     break
              //   }
              // }
              this.setData({
                team_list: temp_list
              })
            }
          }
          else{
            wx.showModal({
              title: '警告',
              content: '获取我的队伍信息失败，请重新加载！',
              showCancel: false,
            })
          }
        }
      })
    })
  },

})