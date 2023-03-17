import Dialog from '../../dist/dialog/dialog';
Page({
  data: {
    isName: true,
    isPhone: true,
    isqq: true,
    name: "",
    gender: "",
    academy: "",
    phone: "",
    qq: "",
    list: [],
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
      ['Struts', 'Spring', 'Maven', 'Spring Cloud', 'Spring Boot', 'Tomcat', 'Mybatis'],
      ['Git', 'SVN', 'CVS', 'HG'],
      ['Windows', 'Linux', 'Unix', 'IOS', 'Android', '机器学习', '算法', '大数据']
    ],
    option1: [{
        text: '男',
        value: 0
      },
      {
        text: '女',
        value: 1
      },
    ],
    value1: 0,
    option2: [{
        text: '机械科学与工程学院',
        value: 1
      },
      {
        text: '光学与电子信息学院',
        value: 2
      },
      {
        text: '材料科学与工程学院',
        value: 3
      },
      {
        text: '能源与动力工程学院',
        value: 4
      },
      {
        text: '中欧清洁与可再生能源学院',
        value: 5
      },
      {
        text: '电气与电子工程学院',
        value: 6
      },
      {
        text: '电子信息与通信学院',
        value: 7
      },
      {
        text: '人工智能与自动化学院',
        value: 8
      },
      {
        text: '计算机科学与技术学院',
        value: 9
      },
      {
        text: '船舶与海洋工程学院',
        value: 10
      },
      {
        text: '土木与水利工程学院',
        value: 11
      },
      {
        text: '建筑与城市规划学院',
        value: 12
      },
      {
        text: '环境科学与工程学院',
        value: 12
      },
      {
        text: '航空航天学院',
        value: 13
      },
      {
        text: '网络空间安全学院',
        value: 14
      },
      {
        text: '软件学院',
        value: 15
      },
      {
        text: '生命科学与技术学院',
        value: 16
      },
      {
        text: '数学与统计学院',
        value: 17
      },
      {
        text: '物理学院',
        value: 18
      },
      {
        text: '化学与化工学院',
        value: 19
      },
      {
        text: '武汉光电国家研究中心',
        value: 20
      },
      {
        text: '武汉国际微电子学院',
        value: 21
      },
      {
        text: '工程科学学院',
        value: 22
      },
      {
        text: '未来技术学院',
        value: 23
      },
      {
        text: '集成电路学院',
        value: 24
      },
      {
        text: '医疗装备科学与工程研究院',
        value: 25
      },
      {
        text: '基础医学院',
        value: 26
      },
      {
        text: '公共卫生学院',
        value: 27
      },
      {
        text: '药学院',
        value: 28
      },
      {
        text: '护理学院',
        value: 29
      },
      {
        text: '医药卫生管理学院',
        value: 30
      },
      {
        text: '法医学系',
        value: 31
      },
      {
        text: '生殖健康研究所',
        value: 32
      },
      {
        text: '口腔医学院',
        value: 33
      },
      {
        text: '第一临床学院',
        value: 34
      },
      {
        text: '第二临床学院',
        value: 35
      },
      {
        text: '第三临床学院',
        value: 36
      },
      {
        text: '哲学学院',
        value: 37
      },
      {
        text: '经济学院',
        value: 38
      },
      {
        text: '社会学院',
        value: 39
      },
      {
        text: '法医学系',
        value: 40
      },
      {
        text: '法学院',
        value: 41
      },
      {
        text: '马克思主义学院',
        value: 42
      },
      {
        text: '教育科学研究院',
        value: 43
      },
      {
        text: '继续教育学院',
        value: 44
      },
      {
        text: '人文学院',
        value: 45
      },
      {
        text: '社会学院',
        value: 46
      },
      {
        text: '外国语学院',
        value: 47
      },
      {
        text: '新闻与信息传播学院',
        value: 48
      },
      {
        text: '管理学院',
        value: 49
      },
      {
        text: '公共管理学院',
        value: 50
      },
      {
        text: '体育学院',
        value: 51
      },
      {
        text: '艺术学院',
        value: 52
      },
    ],
    value2: 1,
    itemTypeList: [{
        name: "个人信息",
        categoryType: "1"
      },
      {
        name: "联系方式",
        categoryType: "2"
      },
      {
        name: "技术栈",
        categoryType: "3"
      }
    ],
    index: 1,
    activeKey: 0,
    active: 0,
    //下拉菜单
    index1: 0, //选择的下拉列表下标,
    show1: false, //控制下拉列表的显示隐藏,false隐藏、true显示
    selectData1: ['男',
      '女',
    ],
    index2: 0, //选择的下拉列表下标,
    show2: false, //控制下拉列表的显示隐藏,false隐藏、true显示
    //学院列表
    selectData2: ["机械科学与工程学院",
      "光学与电子信息学院",
      "材料科学与工程学院",
      "能源与动力工程学院",
      "中欧清洁与可再生能源学院",
      "电气与电子工程学院",
      "电子信息与通信学院",
      "人工智能与自动化学院",
      "计算机科学与技术学院",
      "船舶与海洋工程学院",
      "土木与水利工程学院",
      "建筑与城市规划学院",
      "环境科学与工程学院",
      "航空航天学院",
      "网络空间安全学院",
      "软件学院",
      "生命科学与技术学院",
      "数学与统计学院",
      "物理学院",
      "化学与化工学院",
      "武汉光电国家研究中心",
      "武汉国际微电子学院",
      "工程科学学院",
      "未来技术学院",
      "集成电路学院",
      "医疗装备科学与工程研究院",
      "基础医学院",
      "公共卫生学院",
      "药学院",
      "护理学院",
      "医药卫生管理学院",
      "法医学系",
      "生殖健康研究所",
      "口腔医学院",
      "第一临床学院",
      "第二临床学院",
      "第三临床学院",
      "哲学学院",
      "经济学院",
      "社会学院",
      "法学院",
      "马克思主义学院",
      "教育科学研究院",
      "继续教育学院",
      "人文学院",
      "外国语学院",
      "新闻与信息传播学院",
      "管理学院",
      "公共管理学院",
      "体育学院",
      "艺术学院"
    ],
    //技术栈列表
    selectData3: ['JAVA',
    'C/C++',
    'Python',
    'C#',
    'GO',
    'PHP',
    'MATLAB',
    'Oracle',
    'Mysql',
    'SQL Server',
    'Access',
    'TiDB',
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Angular',
    'Struts',
    'Spring',
    'Maven',
    'Spring Cloud',
    'Spring Boot',
    'Tomcat',
    'Mybatis',
    'Git',
    'SVN',
    'CVS',
    'HG',
    'Windows',
    'Linux',
    'Unix',
    'IOS',
    'Android',
    '机器学习',
    '算法',
    '大数据',
    ],
    //掌握程度列表
    selectData4: ['入门', '熟练', '精通'],
    //skill->skilltype
    // skillToType : new Map([
    //   ['JAVA','语言'],
    //   ['C/C++','语言'],
    //   ['Python','语言'],
    //   ['C#','语言'],
    //   ['GO','语言'],
    //   ['PHP','语言'],
    //   ['MATLAB','语言'],
    //   ['Oracle','数据库'],
    //   ['Mysql','数据库'],
    //   ['SQL Server','数据库'],
    //   ['Access','数据库'],
    //   ['TiDB','数据库'],
    //   ['HTML','前端'],
    //   ['CSS','前端'],
    //   ['JavaScript/TypeScript','前端'],
    //   ['React/Vue/Angular','前端'],
    //   ['Struts','后端'],
    //   ['Spring','后端'],
    //   ['Maven','后端'],
    //   ['Spring Cloud','后端'],
    //   ['Spring Boot','后端']
    //   ['Tomcat','后端'],
    //   ['Mybatis','后端'],
    //   ['Git','版本管理工具'],
    //   ['SVN','版本管理工具'],
    //   ['CVS','版本管理工具'],
    //   ['HG','版本管理工具'],
    //   ['Windows','其他'],
    //   ['Linux','其他'],
    //   ['Unix','其他'],
    //   ['IOS','其他'],
    //   ['Android','其他'],
    //   ['机器学习','其他'],
    //   ['算法','其他'],
    //   ['大数据','其他'],
    // ]),
    //跳转url
    changesrc:"/pages/person/person"
  },
  onChange_side(event) {
    this.setData({
      active: event.detail
    })
  },
  selectTap1() {
    this.setData({
      show1: !this.data.show1,
    });
  },
  selectTap2() {
    this.setData({
      show2: !this.data.show2
    });
  },
  // 点击下拉列表
  optionTap1(e) {
    let Index = e.currentTarget.dataset.index1; //获取点击的下拉列表的下标
    this.setData({
      index1: Index,
      show1: !this.data.show1,
    });
    this.setData({
      gender: this.data.selectData1[this.data.index1]
    })
    console.log(this.data.gender);
  },
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index2; //获取点击的下拉列表的下标
    this.setData({
      index2: Index,
      show2: !this.data.show2
    });
    this.setData({
      academy: this.data.selectData2[this.data.index2]
    })
    console.log(this.data.academy);
  },
  onLoad: function (options) {
    this.setData({
      name: options.name,
      index1: this.data.selectData1.indexOf(options.gender),
      gender: options.gender,
      index2: this.data.selectData2.indexOf(options.academy),
      academy: options.academy,
      phone: options.phone,
      qq: options.qq,
      list: JSON.parse(options.list),
    })
  },
  onChangeName(event) {
    // event.detail 为当前输入的值
    let isname = event.detail === "" ? false : true
    if (isname) {
      this.setData({
        name: event.detail,
        isName: true
      })
    } else {
      this.setData({
        isName: false
      })
    }
  },
  onChangePhone(event) {
    // event.detail 为当前输入的值
    let isphone = /^1[3-9]\d{9}$/.test(event.detail)
    if (isphone) {
      this.setData({
        phone: event.detail,
        isPhone: true
      })
      console.log(this.data.phone);
    } else {
      this.setData({
        isPhone: false
      })
    }

  },
  onChangeQQ(event) {
    // event.detail 为当前输入的值
    let isqq = /^\d{5,12}$/.test(event.detail)
    if (isqq) {
      this.setData({
        qq: event.detail,
        isqq: true
      })
    } else {
      this.setData({
        isqq: false
      })
    }

  },
  //

  bindMultiPickerChange(event) {
    this.setData({
      multiIndex: event.detail.value
    })

    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    let list = this.data.list;
    let i = 0,
      flag = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i].tech_name === data.multiArray[1][data.multiIndex[1]]) {
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
      this.data.list.push({
        tech_id: this.data.selectData3.indexOf(data.multiArray[1][data.multiIndex[1]]),
        tech_level: this.data.selectData4.indexOf(data.multiArray[2][data.multiIndex[2]]),
        tech_name: data.multiArray[1][data.multiIndex[1]],
        tech_class: data.multiArray[0][data.multiIndex[0]],
      })
      console.log(list);
      this.setData({
        list: this.data.list
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
  deleteSkill(e) {
    let id = e.currentTarget.id;
    let list = [...this.data.list];
    let i = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i].tech_name === id)
        list.splice(i, 1);
    }
    this.setData({
      list: list
    })
  },
  onSubmit() {
    let app = getApp()
    //更新用户信息
    wx.request({
      url: 'https://hustbestmatch.club/info/userinfo',
      method: 'POST',
      header:{
        "Authorization": app.globalData.author_token
      },
      data:{
        sex: this.data.gender,
        name: this.data.name,
        adm_name: this.data.academy,
        user_qq: this.data.qq,
        user_phone: this.data.phone,
      },
      success: res=>{
        if(res.data.status === 0){
          
        }
        else if (res.data.code === 2){
          wx.showModal({
            title: '警告',
            content: '未查询到该学院，请重新填写！',
            showCancel: false,
          })
        }
        else if (res.data.code === 3){
          wx.showModal({
            title: '警告',
            content: '出现未知的更新失败，请重新填写！',
            showCancel: false,
          })
        }
      }
    })

    //删除数据库中用户技术栈
    wx.request({
      url: 'https://hustbestmatch.club/info/userinfo/deltech',
      method: 'POST',
      header:{
        "Authorization": app.globalData.author_token
      },
      success: res=>{
        if(res.data.status === 0){
          this.updateSkill()
        }
        else{
          console.log('err')
        }
      }
    })
  },

  //更新用户技术栈
  updateSkill(){
    this.data.list.forEach((item)=>{
      let app = getApp()
      wx.request({
        url: 'https://hustbestmatch.club/info/userinfo/tech',
        method: 'POST',
        header:{
          "Authorization": app.globalData.author_token
        },
        data:{
          tech_id: item.tech_id,
          tech_level: item.tech_level,
        },
        success: res=>{
          console.log(res.data)
          if(res.data.status === 0){
            wx.showToast({
              title: '修改成功', //弹框内容
              icon: 'success',  //弹框模式
              duration: 3000    //弹框显示时间
            })
            const url=this.data.changesrc
            wx.navigateTo({url})
          }
          else{
            wx.showModal({
              title: '警告',
              content: '添加技术栈失败，请重新填写！',
              showCancel: false,
            })
          }
        }
      })
    })
  },
})