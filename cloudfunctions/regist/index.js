// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//数据库
const db = cloud.database()
const userCollection = db.collection("user")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var userInfo = event.userInfo
  var gender = "";
  switch (userInfo.gender) {
    case 1: gender = "男";break;
    case 2: gender = "女";break;
    default: gender = "未知";
  }
  var openid = wxContext.OPENID
  var success = ""
  var re

  // 读取数据库，查找该用户的记录
  await userCollection.where({
    userId: openid
  }).update({
    data:{
      avatar: userInfo.avatarUrl,
      nickname: userInfo.nickName,
      gender: gender,
      type: "用户"
    }
  }).then(res =>{
      success = "success"
      re = res
    })
    .catch(error =>{
      success = "fail"
      re = error
    })

    return {
      success: success,
      re: re
    }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}