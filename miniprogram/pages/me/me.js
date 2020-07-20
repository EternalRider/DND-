// pages/me/me.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database()
const uc = db.collection("user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    auth: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    page.setData({
      userInfo: app.globalData.userInfo
    })

    if (app.globalData.userInfo == null) {
      page.setData({
        userInfo: {
          avatarUrl: "../../images/me_icon_selected.png",
          nickName: "未授权，点击授权"
        },
        auth: false
      })
    }
    // console.log(app.globalData.userInfo)
  },

  // 点击head
  getUserInfo: function() {
    var page = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 成功获取授权
        console.log("成功获取授权");
        wx.getUserInfo({
          success: res => {
            console.log("成功获取用户信息")
            console.log(res.userInfo);
            // app.globalData.userInfo = res.userInfo;
            app.setUserInfo(res.userInfo);
            // page.setData({
            //   userInfo: res.userInfo
            // })

            var userInfo = res.userInfo;
            wx.cloud.callFunction({
              name: 'regist',
              data: {
                userInfo: userInfo
              },
            })
              .then(res => {
                // console.log(res)
                if(res.result.success == "success"){
                  //提示修改成功
                  wx.showToast({
                    title: '授权注册成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
              .catch(err => {
              console.log(err)
            })

            // 返回用户中心界面
            wx.reLaunch({
              url: "../me/me"
            })
          }
        })
      }
    })
  },

  /**
   * 点击偏好设置
   */
  toSet: function () {
    wx.navigateTo({
      url: '../subpages/setting/setting',
    })
  }
})