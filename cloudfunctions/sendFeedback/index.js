// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//数据库
const db = cloud.database()
const feedbackCollection = db.collection("feedback")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var content = event.content
  var date = new Date()
  var currentTime = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours()+8, date.getMinutes(), date.getSeconds()]
  var time = currentTime[0] + "-" + currentTime[1] + "-" + currentTime[2] + "-" + currentTime[3] + "-" + currentTime[4] + "-" + currentTime[5]

  await feedbackCollection.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      userId: wxContext.OPENID,
      content: content,
      time: time
    }
  })
    .then(res => {
      success = "success"
      re = res
    })
    .catch(error => {
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