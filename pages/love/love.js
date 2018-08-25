import {
  LoveModel
} from '../../models/love'
import {
  LikeModel
} from '../../models/like'
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
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loveModel.getLatest((data) => {
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classic: data
      })
    })
  },

  onPrevious: function (event) {
    let index = this.data.classic.index
    loveModel.getPrevious(index, (data) => {
      if (data) {
        this._getLikeStatus(data.id, data.type)
        this.setData({
          classic: data,
          latest: loveModel.isLatest(data.index),
          first: loveModel.isFirst(data.index)
        })
      } else {
        console.log('not more classic')
      }
    })
  },

  onNext: function (event) {
    let index = this.data.classic.index
    loveModel.getNext(index, (data) => {
      if (data) {
        this._getLikeStatus(data.id, data.type)
        this.setData({
          classic: data,
          latest: loveModel.isLatest(data.index),
          first: loveModel.isFirst(data.index)
        })
      } else {
        console.log('not more classic')
      }
    })
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