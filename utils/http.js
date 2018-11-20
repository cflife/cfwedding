import {
    config
} from '../config'
class HTTP {
    constructor() {
        this.baseRestUrl = config.api_blink_url
    }

    request(params) {
        return new Promise((resolve, reject) => {
            let url = this.baseRestUrl + params.url;
            params.method = params.method ? params.method : 'GET'
            wx.request({
                url: url,
                data: params.data,
                method: params.method,
                header: {
                    'content-type': 'application/json',
                    'token':wx.getStorageSync('token')
                },
                success: function (res) {
                    let code = res.statusCode.toString()
                    if (code.startsWith('2')) {
                        resolve(res.data)
                        // params.success && params.success(res.data)
                    } else {
                        reject(res)
                        // params.error && params.error(res)

                    }
                },
                fail: function (err) {
                    reject(err)
                    // params.fail && params.fail(err)
                }
            })
        })

    }
}

export {
    HTTP
}