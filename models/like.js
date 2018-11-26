import {
  HTTP
} from '../utils/http.js'
class LikeModel extends HTTP {
  constructor() {
    super()
  }

  getDistanceLikeStatus(did) {
    return new Promise((resolve, reject) => {
      var params = {
        url: 'distance/like/status/' + did,
      }
      this.request(params).then(res => {
        resolve(res)
      })
    })

  }

  getAlbumLikeStatus(aid) {
    return new Promise((resolve, reject) => {
      var params = {
        url: 'albums/like/status/' + aid,
      }
      this.request(params).then(res => {
        resolve(res)
      })
    })
  }

  like(like_or_cancel, did) {
    return new Promise((resolve, reject) => {
      let url = like_or_cancel === 'cancel' ? 'distance/like/cancel' : 'distance/like'
      this.request({
        url: url,
        method: 'POST',
        data: {
          did: did,
        },
      }).then(res => {
        resolve(res)
      })
    })
  }

  albumlike(like_or_cancel, aid) {
    return new Promise((resolve, reject) => {
      let url = like_or_cancel === 'cancel' ? 'albums/like/cancel' : 'albums/like'
      this.request({
        url: url,
        method: 'POST',
        data: {
          aid: aid,
        },
      }).then(res => {
        resolve(res)
      })
    })
  }
}

export {
  LikeModel
}