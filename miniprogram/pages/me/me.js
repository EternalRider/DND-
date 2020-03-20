// pages/me/me.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    page.setData({
      userInfo: app.globalData.userInfo
    })
    // console.log(app.globalData.userInfo)
  },

  /**
   * 点击偏好设置
   */
  toSet: function () {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  /**
   * 点击提交反馈
   */
  toFeedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }
})