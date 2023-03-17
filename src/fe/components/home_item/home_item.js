// components/home_item/home_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    name: String,
    tid: Number,
    ddl: String,
    leftDate: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(){
      const url = "/pages/MyTeamDetails/MyTeamDetails?"
                + "team_id=" + this.properties.tid + "&&"
                + "ChangeAutority=" + false
      console.log(this.properties.tid)
      wx.navigateTo({url})
    },
  }
})
