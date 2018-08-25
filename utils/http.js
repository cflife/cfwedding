import {
    config
} from '../config'
class HTTP {
    constructor() {
        this.baseRestUrl = config.api_blink_url
    }

    request(params) {
        let url = this.baseRestUrl + params.url;
        params.method = params.method ? params.method : 'GET'
        wx.request({
            url: url,
            data: params.data,
            method: params.method,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: function (res) {
                let code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else {
                    params.error && params.error(res)

                }
            },
            fail: function (err) {
                params.fail && params.fail(err)
            }
        })
    }
}

export {HTTP}