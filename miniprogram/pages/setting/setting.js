// pages/setting/setting.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ideal: 1,
    bond: 1,
    flaw: 1,
    traits: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var preferences = app.globalData.preferences

    this.setData({
      ideal: preferences.ideal,
      bond: preferences.bond,
      flaw: preferences.flaw,
      traits: preferences.traits
    })
  },

  /**
   * 保存偏好设置
   */
  savePreferences:function (e) {
    // console.log(e.detail)
    wx.cloud.init()

    //修改本地全局变量
    app.globalData.preferences = e.detail.value
    //调用云函数修改数据库
    wx.cloud.callFunction({
      name: 'updatePreference',
      data: {
        preferences: e.detail.value
      },
    })
      .then(res => {
        // console.log(res)
        if(res.result.success == "success"){
          //提示修改成功
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
      .catch(err => {
      console.log(err)
    })
  }

  
})