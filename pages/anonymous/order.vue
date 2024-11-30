<template>
    <view style="background-color: #222">
        <view class="wrapper wrapper-order">
            <view class="empty text" v-if="empty">
                {{ empty_text }}
            </view>
            <scroll-view :scroll-y="true" style="height: 88vh">
                <view class="cards" v-if="!empty">
                    <view class="">
                        <view class="info title">
                            <view>
                                <strong>订单号-</strong>
                                <span>{{ orderData.order_sn }}</span>
                            </view>
                        </view>

                        <view class="info price">{{ orderData.price_text }}</view>

                        <view class="detail-box">
                            <view class="left">商品详情</view>
                            <view class="right">
                                {{ orderData.package_text }}
                            </view>
                        </view>

                        <view class="btn" @tap="pay">立即支付</view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
const Api = require('../../common/ajax.js');
export default {
    data() {
        return {
            orderData: {
                order_sn: '',
                price_text: '',
                package_text: ''
            },
            payment_detail: {},
            empty: false,
            empty_text: '未查询到订单信息'
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        // this.onGetOpenId("17304528658032971");
        // return
        if (!options.scene) {
            this.setData({
                empty: true
            });
            uni.showModal({
                title: '',
                content: '未查询到订单信息',
                showCancel: false,
                // 不显示取消按钮
                success(res) {
                    if (res.confirm) {
                        uni.exitMiniProgram({
                            success: () => {
                                console.log('小程序已关闭');
                            },
                            fail: () => {
                                console.log('关闭小程序失败');
                            }
                        });
                    }
                }
            });
            return;
        }
        this.onGetOpenId(options.scene);
    },
    methods: {
        onGetOpenId: function (orderId) {
            var that = this;
            uni.login({
                success: (res) => {
                    console.info('获取登陆code成功', res);
                    Api.request(
                        'v1/user/wechatLogin',
                        'POST',
                        {
                            js_code: res.code
                        },
                        (data) => {
                            console.log(data); // 处理请求成功的逻辑
                            that.reportLog('anonymous pay wx_open_id: ' + data?.data?.user_info?.wx_open_id + ' orderId:' + orderId);
                            this.getOrderInfo(data?.data?.user_info?.wx_open_id, orderId);
                        }
                    );
                },
                fail: (res) => {
                    console.error('获取用户信息失败', res);
                }
            });
        },

        getOrderInfo: function (openid, orderId) {
            Api.request(
                '/v1/memberPackage/wechatpayAppletParams',
                'POST',
                {
                    order_sn: orderId,
                    openid: openid
                },
                (data) => {
                    console.log(data); // 处理请求成功的逻辑
                    uni.hideLoading();
                    if (data.data.err_code == 0) {
                        this.setData({
                            empty: true,
                            empty_text: data.data.err_msg
                        });
                        uni.showModal({
                            title: '',
                            content: '订单已经取消或者已经支付',
                            showCancel: false,
                            // 不显示取消按钮
                            success(res) {
                                if (res.confirm) {
                                    uni.exitMiniProgram({
                                        success: () => {
                                            console.log('小程序已关闭');
                                        },
                                        fail: () => {
                                            console.log('关闭小程序失败');
                                        }
                                    });
                                }
                            }
                        });
                    } else if (data.data.info && data?.data?.payment_detail) {
                        this.setData({
                            orderData: data?.data.info,
                            payment_detail: data?.data.payment_detail
                        });
                        return;
                    } else {
                        this.setData({
                            empty: true,
                            empty_text: '订单有误'
                        });
                    }
                },
                function (err) {
                    console.error(err); // 处理请求失败的逻辑
                }
            );
        },

        pay: function () {
            uni.requestPayment({
                timeStamp: this?.payment_detail.timeStamp + '',
                nonceStr: this?.payment_detail.nonceStr,
                package: this?.payment_detail.package,
                signType: this?.payment_detail.signType,
                paySign: this?.payment_detail.paySign,
                success: function (res) {
                    console.log('支付成功');
                    uni.showModal({
                        title: '',
                        content: '支付成功',
                        showCancel: false,
                        // 不显示取消按钮
                        success(res) {
                            if (res.confirm) {
                                uni.exitMiniProgram({
                                    success: () => {
                                        console.log('小程序已关闭');
                                    },
                                    fail: () => {
                                        console.log('关闭小程序失败');
                                    }
                                });
                            }
                        }
                    });
                },
                fail: function (res) {
                    console.log('支付失败', res);
                    uni.showModal({
                        title: '',
                        content: '支付失败(' + res?.errMsg + ')',
                        showCancel: false,
                        // 不显示取消按钮
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定');
                            }
                        }
                    });
                }
            });
        },

        reportLog: function (log) {
            Api.request(
                'v1/log/wxapp',
                'POST',
                {
                    log: log
                },
                (data) => {
                    console.log('---log---', data); // 处理请求成功的逻辑
                },
                function (err) {
                    console.error(err); // 处理请求失败的逻辑
                }
            );
        }
    }
};
</script>
<style>
.wrapper,
.wrapper-info {
    color: #010101;
    background-color: #f7f7f7;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
}

.wrapper-order .cards {
    width: 100%;
    margin: 0 auto;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0 0 0;
}

.price {
    font-size: 36px;
    line-height: 80px;
    font-weight: bold;
    padding: 10px 0 10px 0;
    text-align: center;
}

.font24 {
    font-size: 28px;
    line-height: 80px;
    display: inline-block;
}

.empty {
    color: #010101;
    font-size: 40rpx;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.center {
    text-align: center;
}

.btn {
    background-color: #07c160;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 90vw;
    margin: 30px auto;
    color: #fff;
    font-size: 24px;
    border-radius: 8px;
}

.detail-box {
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
</style>
