import { config } from '../config'
class HTTP {
    constructor() {
        this.baseRestUrl = config.api_blink_url
    }

    request(params) {
        let url = this.baseRestUrl + params.url;
        params.method = params.method ? params.method : 'GET'
        wx.request({
            url:url,
            data:params.data,
            method:params.method,
            header:{
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success:function(res){
                let code = res.statusCode.tostring()
                if(code.startsWith('2')){

                }
            }
        })
    }
}