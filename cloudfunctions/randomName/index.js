// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const nameCollection = db.collection('name')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var race = event.race;//参数，种族，用来从数据库中获取对应种族的记录
  var sex = event.sex;//参数，性别，用来从对应种族的记录中获取对应性别的名字列表
  var times = event.times;//参数，次数，随机多少次
  var family = event.family;//参数，是否有姓氏，取值范围为"全"、"无"、"随机"，全有姓氏，无没有姓氏，随机50%概率有姓氏
  var re = [];//返回的内容，名字列表
  var raceRecord;//从数据库中获取的记录

  //从数据库获取相应种族对应的记录
  await nameCollection.where({
    racename:race
  }).get().then(res => {
    raceRecord = res.data[0]
  });

  //循环times参数次数，调用randomName函数随机这么多个名字并push到re中
  for(i=0;i<times;i++){
    re.push(randomName(sex, raceRecord, family));
  }

  return re

  // return {
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  // }
}

//读取数据库，随机名字
randomName = function (sex, raceRecord,family){
  var list; //根据性别来获取的实际名字列表
  var haveFamily; //布尔值，是否有姓氏
  //根据性别安排名字列表，非男非女即为随机
  if(sex == "男"){
    list = raceRecord.malenamelist
  }
  else if(sex == "女"){
    list = raceRecord.femalenamelist
  }
  else if (Math.random() >= 0.5){
    list = raceRecord.malenamelist
  }
  else{
    list = raceRecord.femalenamelist
  }
  var re;//返回值，也就是一个名字
  re = list[Math.floor(Math.random()*list.length)]
  //用random函数生成随机值并用floor函数取整，然后用该整数从列表中取名字

  //根据family参数，设置是否有姓氏，取值范围为"全"、"无"、"随机"，全有姓氏，无没有姓氏，随机50%概率有姓氏
  switch(family){
    case "全" : haveFamily = true;break;
    case "无" : haveFamily = false;break;
    default : if(Math.random() >= 0.5) haveFamily = true;else haveFamily = false;break;
  }
  //如果有姓氏则随机姓氏，并根据西方习惯用·隔开后加在名字后面
  if(haveFamily){
    re = re + "·" + raceRecord.familynamelist[Math.floor(Math.random() * raceRecord.familynamelist.length)]
  }  

  return re;
}

