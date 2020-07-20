// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ""
    },
    notice: {
      type: Number,
      value: 0
    },
    noticeColor: {
      type: String,
      value: "#00FF00"
    },
    topLine: {
      type: Boolean,
      value: false
    },
    bottomLine: {
      type: Boolean,
      value: false
    },
    childLevel: {
      type: Number,
      value: 0
    },
    noArrow: {
      type: Boolean,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    array:[]
  },

  lifetimes: {
    attached(){
      var array = [];
      for (var i = 0; i < this.childLevel; i=i+1){
        array.push(i)
      }
      this.setData({
        array: array
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    listOnTap(e) {
      this.triggerEvent('taplist',e,{})
    },
    listOnLangTap(e) {
      this.triggerEvent('langtaplist', e, {})
    },
    arrowOnTap(e) {
      this.triggerEvent('taparrow', e, {})
    }
  }
})
