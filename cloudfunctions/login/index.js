// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

//数据库
const db = cloud.database()
const userCollection = db.collection("user")

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async(event, context) => {
  // console.log(event)
  // console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  var userRecords = []
  var openid = wxContext.OPENID

  // console.log(wxContext)

  // 读取数据库，查找该用户的记录
  await userCollection.where({
    userId: openid
  }).get().then(res => {
    userRecords = res.data
  })

  // 如果没有记录，则创建新的记录，如果有，则返回其记录
  if (userRecords.length == 0){
    await userCollection.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        userId: wxContext.OPENID,
        preferences: {
          ideal: 1,
          bond: 1,
          flaw: 1,
          traits: 2
        },
        saveCharactor:[]
      }
    })
    return "new user"
  }
  else{
    return userRecords[0]
  }

  // return userRecords

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}
