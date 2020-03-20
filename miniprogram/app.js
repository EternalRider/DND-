//app.js
App({
  onLaunch: function () {
    this.globalData = {}
    var app = this
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // console.log(res.userInfo)
            }
          })
        }
      }
    })
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log('callFunction test result: ', res)
        if (res.result == "new user"){
          wx.showModal({
            title: '使用介绍',
            content: '通过点击生成按钮，就能够生成名字或特征。黑色字的选项将影响生成的结果。',
            showCancel: false,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          this.globalData.preferences = {
            bond:1,
            ideal:1,
            flaw:1,
            traits:2
          }
        }
        else{
          this.globalData.preferences = res.result.preferences
        }
      }
    })
  }
})
