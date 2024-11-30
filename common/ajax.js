const baseUrl = 'https://h5-api.itopline.com/';
const request = (url, method, data, successCallback, failCallback) => {
    const token = uni.getStorageSync('token') || null;
    uni.request({
        url: baseUrl + url,
        method: method,
        data: data,
        header: {
            'XX-Token': token,
            'content-type': 'application/json',
            'XX-Verify-Api-Version': '1.0.1',
            'XX-Device-Type': 'wxapp',
            lang: 'zh-cn'
        },
        success(res) {
            console.info('ajax请求成功', url, ' --- ', data, ' --- ', res);
            //登陆状态失效直接跳登陆
            if (res.data?.code == '10001') {
                console.log('登陆状态失效直接跳登陆', res.data?.code);
                //登陆状态失效，去登录
                uni.redirectTo({
                    url: '/pages/login/login'
                });
            } else if (typeof successCallback === 'function') {
                successCallback(res.data);
            }
        },
        fail(err) {
            console.info('ajax请求失败', url, ' --- ', data, ' --- ', err);
            if (typeof failCallback === 'function') {
                failCallback(err);
            }
        }
    });
};
module.exports = {
    request
};
