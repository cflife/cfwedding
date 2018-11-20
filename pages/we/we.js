import {
  BookModel
} from '../../models/book'
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getList().then(res => {
      this.setData({
        books: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  albumClick: function (event) {
    console.log(event.detail)
    wx.navigateTo({
      url: '../detail/wedetail?aid=' + event.detail.aid,
    })
  }
})