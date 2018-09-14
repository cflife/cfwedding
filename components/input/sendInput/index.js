// components/input/sendInput/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sendTest:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputing(event){
      this.data.sendTest = event.detail.value
    },
    send(event){
      this.triggerEvent('sendClick', {
        sendTest: this.data.sendTest
      }, {})
    }
  }
})
