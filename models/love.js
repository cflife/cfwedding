import {
  HTTP
} from '../utils/http.js'

class LoveModel extends HTTP {
  prefix = 'classic'

  constructor() {
    super()
  }

  getLatest(sCallback) {
    var params = {
      url: 'lastdistance'
    }
    this.request(params).then(data => {
      let key = this._fullKey(data.id)
      wx.setStorageSync(key, data)
      this._setLatestIndex(data.id)
      sCallback(data)
    }, err => {

    })
  }

  getPrevious(index, sCallback) {
    console.log(index)
    this._getClassic(index, 'previous', sCallback)
  }

  getNext(index, sCallback) {
    this._getClassic(index, 'next', sCallback)
  }

  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }

  isLatest(index) {
    let key = this._fullKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    if (latestEpsoide) {
      if (index == latestEpsoide) {
        return true
      }
    } else return false
  }

  isFirst(index) {
    if (index == 1) {
      return true
    } else return false
  }

  getMyFavor(success) {
    let params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  _getClassic(index, next_or_previous, sCallback) {
    let key = next_or_previous == 'next' ? this._fullKey(index + 1) :
      this._fullKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      let params = {
        url: 'distance/' + next_or_previous,
      }
      this.request(params).then(data => {
        let key = this._fullKey(data.id)
        wx.setStorageSync(key, data)
        sCallback(data)
      }, err => {

      })
    } else {
      sCallback(classic)
    }
  }

  /**
   * 在缓存中存放最新一期的期数
   */
  _setLatestIndex(index) {
    let key = this._fullKey('latest-' + index)
    wx.setStorageSync(key, index)
  }

  _getLatestEpsoide(index) {
    let key = this._fullKey(index)
    return wx.getStorageSync(key)
  }

  _fullKey(partKey) {
    // console.log(partKey)
    let key = this.prefix + '-' + partKey
    return key
  }

}
export {
  LoveModel
}