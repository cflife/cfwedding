//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    barrageData: [], //弹幕池
    barragePool: []
  },
  //事件处理函数

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // let barragePool = []
    // barragePool.push({
    //   text: '哈哈哈哈'
    // })
    // this.setData({
    //   barrageData: barragePool
    // })
    this.connectWebSocket();

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  sendMsg: function (event) {
    console.log(event.detail.sendTest)
    wx.sendSocketMessage({
      data: event.detail.sendTest
    })
  },

  connectWebSocket: function () {
    wx.connectSocket({
      url: 'wss://qwdsffcc.cn/wss'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      wx.sendSocketMessage({
        data: 'hello world'
      })
    })
    wx.onSocketMessage((res) => {
      this.data.barragePool.push({text:res.data})
      this.setData({
        barrageData: this.data.barragePool
      })
      console.log('收到服务器内容：' + res.data)
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
  }
})