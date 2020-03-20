// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//获取数据库
const db = cloud.database()
const ageCollection = db.collection('raceage')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  var race = event.race//参数，种族
  var age = event.age//参数，年龄段，值为少年、青年、中年、老年，对应child,yong,adult,old，此外还有作为最大值的max
  var re = 0//返回的内容，一个年龄值
  var raceRecord//从数据库中获取的记录，实际上的数据库
  var min=0 //年龄随机时的最小值，即数据库中与当前年龄段age对应的key的value值
  var max=0 //年龄随机时的最大值，即下一个年龄段对应的key的value值，老年的下一个年龄段即寿终max

  //从数据库获取相应种族对应的记录
  await ageCollection.where({
    race: race
  }).get().then(res => {
    raceRecord = res.data[0]
  });

  //根据年龄段，设置随机的上下限
  switch (age) {
    case "少年": min = raceRecord.child; max = raceRecord.yong; break;
    case "青年": min = raceRecord.yong; max = raceRecord.adult; break;
    case "中年": min = raceRecord.adult; max = raceRecord.old; break;
    case "老年": min = raceRecord.old; max = raceRecord.max; break;
    default: min = raceRecord.child; max = raceRecord.max; console.log("erro!!:" + age); break;
  };

  // console.log("min="+min+";max="+max);
  let k = Math.random() * (max - min); //random函数返回随机0~1的值，乘以最大值-最小值即为随机范围
  // console.log("k="+k)
  k = Math.floor(k); //取整
  re = k + parseInt(min) //随机范围+最小值即为处于随机上下限内的随机值

  return re

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}