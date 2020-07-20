// pages/nameGenerator/nameGenerator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:[
      "点击随机生成按钮以生成名字，改变右侧选项以调整随机内容"
    ],
    times:[1,2,3,4,5],
    index:0,
    options:[["人类","龙裔","矮人","精灵","侏儒","地精","半身人","大地精","兽人","魔裔","半兽人","半精灵","神裔"],["男","女","随机"],["全","无","随机"]],
    oIndex0: 0,
    oIndex1: 0,
    oIndex2: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 随机生成按钮按下后，调用云函数获取名字。
   */
  doGenerate:function(){
    wx.cloud.init();

    var race = this.data.options[0][this.data.oIndex0] ;
    var sex = this.data.options[1][this.data.oIndex1] ;
    var times = this.data.times[this.data.index] ;
    var family = this.data.options[2][this.data.oIndex2] ;
    var page = this; 

    switch(race){
      case "兽人": ;
      case "魔裔": ;
      case "地精": ;
      case "大地精": family = "无" ;break;
      case "半兽人": race = "兽人"; family = "无";break;
      case "神裔": race = "人类";break;
      case "半精灵": if (Math.random() >= 0.5){race = "精灵";}else{race = "人类";};break;
      default:break;
    }

    wx.cloud.callFunction({
      name:'randomName',
      data:{
        race:race,
        sex:sex,
        times:times,
        family:family
      },
    }).then(res => {
      page.setData({
        name: res.result
      })
      // console.log(res.result);
      // console.log(res.errMsg);
      // console.log(res.requestID)
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 选择随机次数
   */
  pickeTimes:function(e){
    this.setData({
      index:e.detail.value
    })
  },

  /**
   * 选择性别、种族和姓氏有无
   */
  pickRace:function(e){
    this.setData({
      oIndex0: e.detail.value
    })
  },
  pickSex: function (e) {
    this.setData({
      oIndex1: e.detail.value
    })
  },
  pickFamily: function (e) {
    this.setData({
      oIndex2: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})