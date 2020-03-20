// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const backCollection = db.collection('background')
const raceCollection = db.collection('name')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var backgroundCollection = [];
  var re = [];
  var mode = event.mode;
  var racedataCollection = [];

  await backCollection.get().then(res =>{
    backgroundCollection = res.data
  })

  await raceCollection.get().then(res => {
    racedataCollection = res.data
  })

  if(mode == "getbacklist"){
    for (i = 0; i < backgroundCollection.length; i++) {
      re.push(backgroundCollection[i].background_name)
    }
  }
  if(mode == "getall"){
    re = backgroundCollection
  }
  if (mode == "getracelist") {
    for (i = 0; i < raceCollection.length; i++) {
      re.push(raceCollection[i].racename)
    }
  }
  if (mode == "getbackracelist"){
    var backgroundlist = [];
    for (i = 0; i < backgroundCollection.length; i++) {
      backgroundlist.push(backgroundCollection[i].background_name);
    }
    var racelist = [];
    for (i = 0; i < racedataCollection.length; i++) {
      racelist.push(racedataCollection[i].racename);
    }
    racelist.push("半兽人");
    racelist.push("半精灵");
    racelist.push("神裔");
    re.push(racelist);
    re.push(backgroundlist);
  }

  return re
}