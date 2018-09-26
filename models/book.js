import {
    HTTP
} from '../utils/http.js'

class BookModel extends HTTP {
    constructor() {
        super()
    }
    getList() {
        return new Promise((resolve, reject) => {
            var params = {
                url: 'albums',
            }
            this.request(params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    getDetailById(id) {
        return new Promise((resolve, reject) => {
            var params = {
                url: `albumDetail/${id}`,
            }
            this.request(params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export {
    BookModel
}