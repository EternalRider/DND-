// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const bgCollection = db.collection('background')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var background = event.background //参数，背景，用来从数据库获取对应的记录
  var times = event.times //参数，次数，即理想羁绊和缺点各随机多少条，为数组，依次为理想、羁绊、缺点的条数
  var re //返回的内容，包含理想、羁绊和缺点的对象
  var backRecord //从数据库中获取的记录
  //返回的内容
  var ideals = ""
  var bonds = ""
  var flaws = ""

  //从数据库获取相应背景对应的记录
  await bgCollection.where({
    background_name: background
  }).get().then(res => {
    backRecord = res.data[0]
  });

  //调用各随机函数，随机各值
  ideals = randomIdeal(backRecord,times[0])
  bonds = randomBond(backRecord, times[1])
  flaws = randomFlaw(backRecord, times[2])

  //将理想、羁绊和缺点封装为对象用来返回
  re = {ideals:ideals,bonds:bonds,flaws:flaws}

  return re

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

randomIdeal = function (backRecord,times){
  var list = backRecord.ideals//设置列表
  var re = ""
  //循环times参数次数，从列表中随机理想并连接到re中
  for (i = 0; i < times; i++) {
    re = re + list[Math.floor(Math.random() * list.length)] + "\n";
  }
  return re
}

randomBond = function (backRecord,times) {
  var list = backRecord.bonds//设置列表
  var re = ""
  //循环times参数次数，从列表中随机理想并连接到re中
  for (i = 0; i < times; i++) {
    re = re + list[Math.floor(Math.random() * list.length)] + "\n";
  }
  return re
}

randomFlaw = function (backRecord,times) {
  var list = backRecord.flaws//设置列表
  var re = ""
  //循环times参数次数，从列表中随机理想并连接到re中
  for (i = 0; i < times; i++) {
    re = re + list[Math.floor(Math.random() * list.length)] + "\n";
  }
  return re
}