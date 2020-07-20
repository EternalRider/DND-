// pages/npcGenerator/npcGenerator.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexs:["男","女","无"],
    sex:0,
    backgrounds:["侍僧","骗子","罪犯","艺人","平民英雄","行会工匠","隐士","贵族","化外之民","智者","水手","士兵","流浪儿","远行者"],
    races: ["人类", "龙裔", "矮人", "精灵", "侏儒", "地精", "半身人", "大地精", "兽人", "魔裔", "半兽人", "半精灵", "神裔"],
    alignments:["守序善良","中立善良","混乱善良","守序中立","绝对中立","混乱中立","守序邪恶","中立邪恶","混乱邪恶"],
    background:0,
    race:0,
    alignment:4,
    ages:["少年","青年","中年","老年"],
    age:1,

    aget:0,
    name:"",
    ideal:"",
    bond:"",
    flaw:"",
    traits:"",

    // preferences:{}
  },

  /**
   * 选择各选项
   */
  bindchange_sex:function(e){
    this.setData({
      sex: e.detail.value
    })
  },
  bindchange_age: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  bindchange_background: function (e) {
    this.setData({
      background: e.detail.value
    })
  },
  bindchange_race: function (e) {
    this.setData({
      race: e.detail.value
    })
  },
  bindchange_alignment: function (e) {
    this.setData({
      alignment: e.detail.value
    })
  },


  /**
   * 随机方法
   */
  generator:function() {
    var race = this.data.races[this.data.race];
    var sex = this.data.sexs[this.data.sex];
    var age = this.data.ages[this.data.age];
    var background = this.data.backgrounds[this.data.background];
    var preferences = this.data.preferences;
    //随机名字，目前姓氏只能随机，兽人、魔裔、地精、大地精没有姓氏，
    //半兽人使用兽人名字，神裔使用人类名字，半精灵随机使用精灵或人类的名字
    var family = "随机";
    var page = this;
    switch (race) {
      case "兽人": ;
      case "魔裔": ;
      case "地精": ;
      case "大地精": family = "无"; break;
      case "半兽人": race = "兽人"; family = "无"; break;
      case "神裔": race = "人类"; break;
      case "半精灵": if (Math.random() >= 0.5) { race = "精灵"; } else { race = "人类"; }; break;
      default: break;
    }
    //调用随机名字的云函数
    wx.cloud.callFunction({
      name: 'randomName',
      data: {
        race: race,
        sex: sex,
        times: 1,
        family: family
      },
    }).then(res => {
      page.setData({
        name: res.result[0]
      })
      // console.log(res.result);
      // console.log(res.errMsg);
      // console.log(res.requestID)
    }).catch(err => {
      console.log(err);
    })

    //随机年龄
    wx.cloud.callFunction({
      name: 'randomAge',
      data: {
        race: race,
        age : age
      },
    }).then(res => {
      page.setData({
        aget: res.result
      })
      // console.log(res.result);
      // console.log(res.errMsg);
      // console.log(res.requestID)
    }).catch(err => {
      console.log(err);
    })

    //随机理想、羁绊、缺点
    wx.cloud.callFunction({
      name: 'randomSoul',
      data: {
        background: background,
        times: [app.globalData.preferences.ideal, app.globalData.preferences.bond, app.globalData.preferences.flaw] //默认只随机1条
      },
    }).then(res => {
      page.setData({
        ideal: res.result.ideals,
        bond: res.result.bonds,
        flaw: res.result.flaws
      })
      // console.log(res.result);
      // console.log(res.errMsg);
      // console.log(res.requestID)
    }).catch(err => {
      console.log(err);
    })

    //随机特点
    wx.cloud.callFunction({
      name: 'randomTrait',
      data: {
        background: background,
        times: app.globalData.preferences.traits //默认随机2条
      },
    }).then(res => {
      page.setData({
        traits: res.result
      })
      // console.log(res.result);
      // console.log(res.errMsg);
      // console.log(res.requestID)
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;

    // //从全局数据中获取偏好设置
    // this.setData({
    //   preferences: app.globalData.preferences
    // })

    // //这个是从云端获取背景和种族列表的方法
    // wx.cloud.callFunction({
    //   name: 'getBackground',
    //   data: {
    //     mode:"getbackracelist"
    //   },
    // }).then(res => {
    //   page.setData({
    //     backgrounds: res.result[1],
    //     races: res.result[0]
    //   })
    //   console.log(res.result);
    //   console.log(res.errMsg);
    //   console.log(res.requestID)
    // }).catch(err => {
    //   console.log(err);
    // })
  },

  /**
   * 复制到剪贴板
   */
  copy: function(e){
    var copy = ""
    // console.log(e.detail)
    copy = copy + "名字：" + e.detail.value.name + "\n";
    copy = copy + "种族：" + this.data.races[e.detail.value.race] + "\n";
    copy = copy + "性别：" + this.data.sexs[e.detail.value.sex] + "\n";
    copy = copy + "阵营：" + this.data.alignments[e.detail.value.alignment] + "\n";
    copy = copy + "年龄：" + e.detail.value.age + "\n";
    copy = copy + "背景：" + this.data.backgrounds[e.detail.value.background] + "\n";
    copy = copy + "理想：\n" + e.detail.value.ideal + "\n";
    copy = copy + "羁绊：\n" + e.detail.value.bond + "\n";
    copy = copy + "缺点：\n" + e.detail.value.flaw + "\n";
    copy = copy + "特点：\n" + e.detail.value.traits + "\n";
    copy = copy + "工作与来历：\n" + e.detail.value.comefrom + "\n";

    // copy.replace("\n\n","\n") //除去连续换行

    wx.setClipboardData({
      data: copy,
      // success(res) {
      //   wx.getClipboardData({
      //     success(res) {
      //       console.log(res.data) // data
      //     }
      //   })
      // }
    })
  }


})