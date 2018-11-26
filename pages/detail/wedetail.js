import {
  BookModel
} from '../../models/book'
import {
  CommentModel
} from '../../models/comment'
import {
  LikeModel
} from '../../models/like'
let bookmodel = new BookModel()
let commentModel = new CommentModel()
let likeModel = new LikeModel()
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
    duration: 1000,
    posting: false,
    noComment: true,
    comments: [],
    aid: '',
    like: false,
    likeNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      aid: options.aid
    })
    bookmodel.getDetailById(options.aid).then(res => {
      this.setData({
        detail: res,
        albumInfo: JSON.parse(res.info)
      })
    }).catch(err => {
      console.log('详情错误')
    })
    commentModel.getComment(options.aid).then(res => {
      this.setData({
        noComment: res.length > 0 ? false : true,
        comments: res
      })
    })
    likeModel.getAlbumLikeStatus(options.aid).then(res => {
      this.setData({
        like: res.isLike,
        likeNum: res.num
      })
    })
  },

  onFakePost: function () {
    this.setData({
      posting: true
    })
  },

  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.albumlike(like_or_cancel, this.data.aid).then(res => {
      console.log('55555', res)
    })
  },

  onPost: function (event) {
    let comment = event.detail.value || event.detail.text
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    commentModel.post(this.data.aid, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })
      this.data.comments.unshift({
        content: comment,
        num: 1
      })
      this.setData({
        comments: this.data.comments,
        noComment: false
      })
    })

    this.setData({
      posting: false
    })
  },

  onCancel: function (event) {
    this.setData({
      posting: false
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

  onShareAppMessage() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})