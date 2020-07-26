// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//数据库
const db = cloud.database()
const userCollection = db.collection("user")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var nickname = event.nickname
  var type = event.type
  var userRecordId
  var openid = wxContext.OPENID
  var success = ""
  var re

  // 读取数据库，查找该用户的记录
  await userCollection.where({
    userId: openid
  }).get().then(res => {
    userRecordId = res.data[0]._id
  })

  if(nickname != null){
    await userCollection.doc(userRecordId).update({
      data:{
        nickname: nickname
      }
    })
      .then(res =>{
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
  }
  else{
    await userCollection.doc(userRecordId).update({
      data:{
        type: type
      }
    })
      .then(res =>{
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
  }
}