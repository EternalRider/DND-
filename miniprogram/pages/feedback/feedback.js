// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 提交反馈
   */
  submitException: function(e){
    var content = e.detail

    wx.cloud.callFunction({
      name: 'sendFeedback',
      data: {
        content: e.detail.value
      },
    })
      .then(res => {
        // console.log(res)
        if (res.result.success == "success") {
          //提示提交成功
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
      .catch(err => {
        console.log(err)
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