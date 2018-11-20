import {
    HTTP
} from '../utils/http.js'

class CommentModel extends HTTP {
    constructor() {
        super()
    }

    getComment(aid) {
        return new Promise((resolve, reject) => {
            var param = {
                url: `albums/${aid}/short_comment`,
            }
            this.request(param).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    post(aid, comment) {
        return new Promise((resolve, reject) => {
            var param = {
                url: `albums/add_short_comment`,
                method: 'POST',
                data: {
                    aid: aid,
                    comment: comment
                },
                error: (err) => {
                    wx.showToast({
                        title: '评论失败',
                    })
                }
            }
            this.request(param).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export {
    CommentModel
}