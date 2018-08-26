import {
  LoveModel
} from '../../models/love'
import {
  LikeModel
} from '../../models/like'
import {
  loveInfo
} from '../../resources/love'
let loveModel = new LoveModel()
let likeModel = new LikeModel()
import {
  config
} from '../../config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    like: false,
    count: 0,
    latest: true,
    first: false,
    loveStep: Number,
    currentLove: Object,
    firstIndex: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loveStep: loveInfo.length,
      firstIndex: loveInfo.length - 1,
      currentLove: loveInfo[loveInfo.length - 1]
    })
    //等待域名
    // loveModel.getLatest((data) => {
    //   this._getLikeStatus(data.id, data.type)
    //   this.setData({
    //     classic: data
    //   })
    // })
  },

  onPrevious: function (event) {
    let currentIndex = this.data.loveStep - 1
    this.setData({
      loveStep: currentIndex,
      currentLove: loveInfo[currentIndex - 1],
      latest: false,
      first: currentIndex == 1 ? true : false
    })

    //等待域名
    // let index = this.data.classic.index
    // loveModel.getPrevious(index, (data) => {
    //   if (data) {
    //     this._getLikeStatus(data.id, data.type)
    //     this.setData({
    //       classic: data,
    //       latest: loveModel.isLatest(data.index),
    //       first: loveModel.isFirst(data.index)
    //     })
    //   } else {
    //     console.log('not more love')
    //   }
    // })
  },

  onNext: function (event) {
    let currentIndex = this.data.loveStep + 1
    this.setData({
      loveStep: currentIndex,
      currentLove: loveInfo[this.data.loveStep],
      latest: currentIndex - 1 == this.data.firstIndex ? true : false,
      first: currentIndex == 1 ? true : false
    })
    //等待域名
    // let index = this.data.classic.index
    // loveModel.getNext(index, (data) => {
    //   if (data) {
    //     this._getLikeStatus(data.id, data.type)
    //     this.setData({
    //       classic: data,
    //       latest: loveModel.isLatest(data.index),
    //       first: loveModel.isFirst(data.index)
    //     })
    //   } else {
    //     console.log('not more classic')
    //   }
    // })
  },

  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    // console.log(this.data.classic,like_or_cancel)
    likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
  },

  _getLikeStatus: function (cid, type) {
    likeModel.getClassicLikeStatus(cid, type, (data) => {
      this.setData({
        like: data.like_status,
        count: data.fav_nums
      })
    })
  }
})