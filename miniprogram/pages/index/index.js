// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   * description项最多26个字
   */
  data: {
    pages:[
      {
        name: "查询法术",
        description: "搜索查询想要的法术详述",
        image: "../../images/nameGenerator_icon_selected.png",
        path: "searchSpell"
      },
      {
        name: "随机名字",
        description: "从相应种族的名字库中随机一些名字",
        image: "../../images/nameGenerator_icon_selected.png",
        path: "nameGenerator"
      },
      {
        name: "随机特征",
        description: "从相应背景的随机库中随机生成一个类5E背景的角色特征",
        image: "../../images/npcGenerator_icon_selected.png",
        path: "npcGenerator"
      }
    ]
  },

  //转到相应页面
  toPage: function (e) {
    //console.log(e)
    var path = e.currentTarget.dataset.path
    //console.log(path)
    wx.navigateTo({
      url: '../subpages/'+path+'/'+path,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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