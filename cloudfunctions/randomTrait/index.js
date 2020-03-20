// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const bgCollection = db.collection('background')
const traitCollection = db.collection('trait')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var background = event.background //参数，背景，用来从数据库获取对应的记录
  var times = event.times //参数，次数，即特点各随机多少条
  var re = "" //返回的内容，特点的字符串
  var backRecord //从数据库中获取的记录
  var traitRecord = []

  //从数据库获取相应背景对应的记录
  await bgCollection.where({
    background_name: background
  }).get().then(res => {
    backRecord = res.data[0]
  });

  //从数据库获取特点的记录
  await traitCollection.get().then(res => {
    traitRecord = res.data
  });

  //循环times参数次数，调用randomTrait函数随机这么多个名字并连接到re中
  for (i = 0; i < times; i++) {
    re = re + randomTrait(backRecord, traitRecord) + "\n";
  }

  return re

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

randomTrait = function (backRecord, traitRecord){
  var re = ""
  if (Math.random() <= (1.0/(traitRecord.length+1))){
    re = backRecord.traits[Math.floor(Math.random() * backRecord.traits.length)]
  }
  else {
    var list = traitRecord[Math.floor(Math.random() * traitRecord.length)].value
    re = list[Math.floor(Math.random() * list.length)]
  }

  return re
}