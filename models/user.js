import {
    HTTP
} from '../utils/http.js'

class UserModel extends HTTP {
    constructor() {
        super()
    }

    postUserInfo(UserInfo) {
        return new Promise((resolve, reject) => {
            this.request({
                url: 'user/userInfo',
                method: 'POST',
                data: {
                    userInfo: UserInfo,
                },
            }).then(res => {
                resolve(res)
            })
        })
    }
}
export {
    UserModel
}