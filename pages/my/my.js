import {
  BookModel
} from '../../models/book'
import {
  UserModel
} from '../../models/user'

let bookModel = new BookModel()
let userModel = new UserModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: true,
    userInfo: null,
    albums: [],
    myBooksCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getMyFavor()
    this.hasGottenUserInfo()
    this.getMyBookCount()
  },

  // onShow:function(options){

  // },

  getMyBookCount() {
    // bookModel.getMyBookCount(data => {
    //   this.setData({
    //     myBooksCount: data.count
    //   })
    // })
  },

  hasGottenUserInfo: function () {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo: function (event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      userModel.postUserInfo(userInfo);
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  getMyFavor: function () {
    bookModel.getMyLike().then(res => {
      this.setData({
        albums: res
      })
    })
  },

  onPreviewTap: function (event) {
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  onJumpToAbout: function (event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy: function (event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  albumClick: function (event) {
    wx.navigateTo({
      url: '../detail/wedetail?aid=' + event.detail.aid,
    })
  },

  onShareAppMessage() {

  }
})