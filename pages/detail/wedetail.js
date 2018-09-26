import {
  BookModel
} from '../../models/book'
let bookmodel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: Object,
    albumInfo: Object,
    imgheights: [],
    current: 0,
    noComment: true,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookmodel.getDetailById(options.bid).then(res => {
      this.setData({
        detail: res,
        albumInfo: JSON.parse(res.info)
      })
    }).catch(err => {
      console.log('详情错误')
    })
  },

  imageLoad: function (e) {
    let scale = e.detail.width / e.detail.height
    let imgheight = wx.getStorageSync('systemInfo').screenWidth / scale
    let heightArr = this.data.imgheights
    heightArr[e.currentTarget.dataset.id] = imgheight
    this.setData({
      imgheights: heightArr
    })
  },

  swiperchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})