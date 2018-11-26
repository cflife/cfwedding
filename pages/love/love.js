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
    distance: null,
    likeInfo: {},
    like: false,
    count: 0,
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //等待域名
    loveModel.getLatest((data) => {
      console.log('数据', data)
      //this._getLikeStatus(data.id, data.type)
      likeModel.getDistanceLikeStatus(data.id).then(res => {
        this.setData({
          likeInfo: res,
          distance: data
        })
      })
    })
    
  },

  onPrevious: function (event) {
    //等待域名
    let index = this.data.distance.id
    loveModel.getPrevious(index, (data) => {
      if (data) {
        //this._getLikeStatus(data.id, data.type)
        this.setData({
          distance: data,
          latest: loveModel.isLatest(data.id),
          first: loveModel.isFirst(data.id)
        })
      } else {
        console.log('not more love')
      }
    })
    likeModel.getDistanceLikeStatus(index - 1).then(res => {
      this.setData({
        likeInfo: res
      })
    })
  },

  onNext: function (event) {
    let index = this.data.distance.id
    loveModel.getNext(index, (data) => {
      if (data) {
        //this._getLikeStatus(data.id, data.type)
        this.setData({
          distance: data,
          latest: loveModel.isLatest(data.id),
          first: loveModel.isFirst(data.id)
        })
      } else {
        console.log('not more classic')
      }
    })
    likeModel.getDistanceLikeStatus(index + 1).then(res => {
      this.setData({
        likeInfo: res
      })
    })
  },

  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    // console.log(this.data.classic,like_or_cancel)
    likeModel.like(like_or_cancel, this.data.distance.id)
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