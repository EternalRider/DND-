// pages/subpages/uploadSpell/uploadSpell.js
wx.cloud.init();
const db = wx.cloud.database()
const tagc = db.collection('tag')
const spello = db.collection('spell-official')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,

    spellLevels: [0,1,2,3,4,5,6,7,8,9],
    levelIndex: 0,

    spellSchools: ["防护","咒法","预言","附魔","塑能","幻术","死灵","变化"],
    schoolIndex: 0,

    castingTimes: ["附赠动作","1动作","1分钟","10分钟","1小时","8小时","反应","特殊"],
    timeIndex: 1,

    publications: [],
    pubIndex: 0,

    components: ["verbal", "somatic", "material"],

    class: [],
    classChecked: [],
    classChoose: [],

    tag: [],
    tagChecked: [],
    tagChoose: [],

    formData: {
      name: "",
      level: 0,
      school: "",
      casting: "",
      range: "",
      duration: "",
      from: "",

      components: [],
      verbal: "",
      somatic: "",
      material: "",

      class: [],
      content: "",
      tag: []
    },
    rules: [{
      name: 'name',
      rules: {required: true, message: '法术名是必填项'},
    },{
      name: 'range',
      rules: {required: true, message: '施法距离是必填项'},
    },{
      name: 'duration',
      rules: {required: true, message: '持续时间是必填项'},
    },{
      name: 'content',
      rules: {required: true, message: '法术内容是必填项'},
    },{
      name: 'content',
      rules: {required: true, message: '法术内容是必填项'},
    }]
  },

  /**
   * 提交表单
   */
  submitForm: function (e) {
    var page = this;

    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
          }
      } else {
          // wx.showToast({
          //     title: '校验通过'
          // })
          var formData = page.data.formData;
          formData.level = page.data.spellLevels[page.data.levelIndex]
          formData.school = page.data.spellSchools[page.data.schoolIndex]
          formData.casting = page.data.castingTimes[page.data.timeIndex]
          formData.from = page.data.publications[page.data.pubIndex]
      
          formData.components = page.data.components
          formData.class = page.data.classChoose
          formData.tag = page.data.tagChoose
          spello.add({
            data: formData,
            success: function(res) {
              console.log(res)
              wx.showToast({
                title: '提交成功'
              })
            }
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;

    //职业和标签列表
    tagc.doc('class').get().then(res => {
      // console.log(res.data)
      var classArray = res.data.array;
      var classChecked = [];
      for(var i=0; i < classArray.length ; i++){
        classChecked.push(false)
      }
      // console.log(classChecked)

      page.setData({
        class: res.data.array,
        classChecked: classChecked
      })
    })
    tagc.doc('tag').get().then(res => {
      // console.log(res.data)
      var tagArray = res.data.array;
      var tagChecked = [];
      for(var i=0; i < tagArray.length ; i++){
        tagChecked.push(false)
      }
      // console.log(classChecked)

      page.setData({
        tag: res.data.array,
        tagChecked: tagChecked
      })
    })
    //出版物出处列表
    tagc.doc('official-pub').get().then(res => {
      // console.log(res.data)
      page.setData({
        publications: res.data.array
      })
    })
  },

  //复选列表改变
  componentsChange(e) {
    this.setData({
      components: e.detail.value
    });
  },
  checkboxChange: function (e) {
    var checkValue = e.detail.value;
    const {field} = e.currentTarget.dataset
    this.setData({
      [`${field}`]: checkValue
    });
  },
  classCheckbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var classChecked = this.data.classChecked;//选项集合
    classChecked[index] = !classChecked[index];//改变当前选中的checked值

    this.setData({
      classChecked: classChecked
    });
  },
  tagCheckbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var tagChecked = this.data.tagChecked;//选项集合
    tagChecked[index] = !tagChecked[index];//改变当前选中的checked值

    this.setData({
      tagChecked: tagChecked
    });
  },

  //输入框输入内容
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    // console.log(e.detail.value)
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },

  //选择器选择内容
  bindSpellLevelsChange: function(e){
    this.setData({
      levelIndex: e.detail.value
    })
  },
  bindSpellSchoolsChange: function(e){
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  bindCastingTimesChange: function(e){
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindPubChange: function(e){
    this.setData({
      pubIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})