const baseUrl = 'https://h5-api.itopline.com/';
const request = (url, method, data, successCallback, failCallback, debug = false) => {
    // const token = wx.getStorageSync("token") || null;
    const token = getApp().globalData.token;
    if (debug) {
        console.log('--- http.js debug start ---');
    }
    if (debug) {
        console.table([
            {
                url,
                method,
                data,
                token
            }
        ]);
    }
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
            if (debug) {
                console.info('success:', res);
            } //登陆状态失效
            if (res.data?.code == '10001') {
                return uni.redirectTo({
                    url: '/pages/mine/login'
                });
            }
            if (res.data?.code != 1) {
                uni.showModal({
                    title: 'error',
                    content: res.data.msg,
                    showCancel: false
                });
                successCallback({
                    error: res.data.msg
                });
            }
            successCallback(res.data);
        },
        fail(err) {
            if (debug) {
                console.info('fail:', err);
            }
            failCallback(err);
        },
        complete() {
            if (debug) {
                console.log('--- http.js debug end ---');
            }
        }
    });
};
const promiseRequest = (url, method, data, debug = false) => {
    return new Promise((resolve, reject) => {
        request(
            url,
            method,
            data,
            (res) => {
                if (res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            },
            (err) => reject(err),
            debug
        );
    });
};
export default {
    data() {
        return {};
    },
    get: (url, ...args) => promiseRequest(url, 'GET', {}, ...args),
    post: (url, data, ...args) => promiseRequest(url, 'POST', data, ...args)
};
