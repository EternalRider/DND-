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
    userType: "",
    auth: true,

    changeNickShow: false,
    HSDbuttons: [{
      type: 'primary',
      className: '',
      text: '确定',
      value: 1
    }],
    nickName: ""
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
    wx.cloud.callFunction({
      name: 'getUserId',
      complete: res => {
        // console.log('callFunction test result: ', res)
        var userId = res.result.openid
        // console.log(userId)
        uc.where({
          userId: userId
        }).get().then(res => {
          // console.log(res)
          page.setData({
            userId: userId,
            userType: res.data[0].type
          })
        })
      }
    })
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

  //输入框输入内容
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    // console.log(e.detail.value)
    this.setData({
        [`${field}`]: e.detail.value
    })
  },

  /**
   * 点击偏好设置
   */
  toSet: function () {
    wx.navigateTo({
      url: '../subpages/setting/setting',
    })
  },
  //点击修改昵称
  toNick: function () {
    this.setData({
      changeNickShow: true
    })
  },
  changeNickBtn: function (e) {
    // console.log(this.data.nickName)
    var nickName = this.data.nickName
    var userInfo = this.data.userInfo
    userInfo.nickName = nickName
    this.setData({
      userInfo: userInfo
    })
    app.setUserInfo(userInfo)
    //调用云函数修改数据库
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        nickname: nickName
      },
    })
      .then(res => {
        // console.log(res)
        if(res.result.success == "success"){
          //提示修改成功
          wx.showToast({
            title: '修改成功',
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
   * 管理员功能
   */
  toUpload: function () {
    wx.navigateTo({
      url: '../subpages/uploadSpell/uploadSpell',
    })
  }
})