// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal, oldVal, changePath) {
        let index = newVal < 10 ? `0${newVal}` : newVal
        this.setData({
          _index: index
        })
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _index: String,
    year: Number,
    month: String,
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
  },

  ready: function () {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})