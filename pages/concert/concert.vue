<template>
    <!-- pages/concert/concert.wxml -->
    <view class="container">
        <view class="banner">
            <image src="/static/images/sucai2.jpg" mode="" />
            <view class="badge">
                <image src="/static/images/star_black.png" mode="" />
                Trending
                <image src="/static/images/star_black.png" mode="" />
            </view>
        </view>
        <view class="box">
            <view class="title underline">直火帮爬墙少年五周年虚拟演唱会</view>
            <view class="info">
                <view class="item">
                    <image class="icon" src="/static/images/time.png" mode="" />
                    时间：2023年7月10日 09:00pm
                </view>
                <view class="item">
                    <image class="icon" src="/static/images/location.png" mode="" />
                    地点：世界上任何有网络的地方
                </view>
                <view class="item">
                    <image class="icon" src="/static/images/location.png" mode="" />
                    入口：此场电脑客户端
                </view>
                <view class="item">
                    <image class="icon" src="/static/images/people.png" mode="" />
                    演出阵容：直火帮 Straight Fire Gang
                </view>
            </view>
        </view>

        <view class="box">
            <view class="title">票档</view>
            <view class="label">盲鸟票包括：直火帮爬墙少年五周年虚拟演唱会 VIP 票</view>
            <view class="ticket-list">
                <view class="item checked">盲鸟票 39元</view>
            </view>
        </view>
        <view class="box">
            <view class="title">数量</view>
            <view class="input">
                <view class="btn" @tap="changeNumber" :data-type="0">-</view>
                <view class="number">{{ number }}</view>
                <view class="btn" @tap="changeNumber" :data-type="1">+</view>
            </view>
        </view>
        <view class="box">
            <view class="title underline">活动声明</view>
            <view class="content">
                <text>
                    时长：以实际演出时长为准。\n 不支持退换：票品为有价票券，非普通商品，其背后承载的文化服务具有时效性，稀缺性等特征，不支持退换，敬请谅解。\n
                    电子票：在此场的官网/小程序注册用户后，可以在个人背包页面中看到所购票信息。\n 实名制观演：此场采用实名制观演，请完成实名制验证或微信授权后购买演出票。\n
                    温馨提示：观看演出需提前下载此场电脑客户端，请预留充足下载及安装时间。\n 更多详情请关注@此场atfield，更多玩法将一一揭晓！
                </text>
            </view>
        </view>
        <view class="foot">
            <view class="left">合计：39</view>
            <view class="btn">立即购买</view>
        </view>
    </view>
</template>

<script>
// pages/concert/concert.js
export default {
    data() {
        return {
            number: 1
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        changeNumber: function (e) {
            if (e.currentTarget.dataset.type) {
                this.setData({
                    number: this.number + 1
                });
            } else {
                if (this.number > 0) {
                    this.setData({
                        number: this.number - 1
                    });
                }
            }
        }
    }
};
</script>
<style>
/* pages/concert/concert.wxss */
.container {
    padding: 32rpx;
    padding-bottom: 152rpx;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.container .banner {
    position: relative;
    width: 100%;
    height: 280rpx;
    border-radius: 20rpx;
    overflow: hidden;
}

.container .banner > image {
    width: 100%;
    height: 100%;
}

.container .banner .badge {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    gap: 4rpx;
    background-color: #d2fa00;
    font-size: 20rpx;
    color: #ffffff;
    padding: 4rpx 8rpx;
    color: #2d2d2d;
    font-weight: bold;
    border-bottom-right-radius: 20rpx;
}

.container .banner .badge image {
    width: 12rpx;
    height: 12rpx;
}

.container .box {
    margin-top: 56rpx;
    width: 100%;
}

.container .box .title {
    font-size: 30rpx;
    font-weight: bold;
    color: #2d2d2d;
    margin-bottom: 20rpx;
    display: inline-block;
    padding-bottom: 2px;
}

.container .box .title.underline {
    font-size: 34rpx;
    text-decoration: underline solid #8200ff 2px;
    line-height: 48rpx;
}

.container .box .info {
    margin-top: 20rpx;
}

.container .box .info .item {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8rpx;
    font-size: 24rpx;
    color: #606060;
    line-height: 36rpx;
    margin-bottom: 8rpx;
}

.container .box .info .item .icon {
    width: 24rpx;
    height: 24rpx;
}

.container .box .content {
    font-size: 24rpx;
    color: #606060;
    line-height: 36rpx;
}

.container .box .label {
    font-size: 28rpx;
    color: #2d2d2d;
}

.container .box .ticket-list {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    gap: 24rpx;
    margin-top: 16rpx;
}

.container .box .ticket-list .item {
    font-size: 28rpx;
    font-weight: bold;
    color: #2d2d2d;
    padding: 22rpx 32rpx;
    border-radius: 24rpx;
    border: 2px solid #2d2d2d;
}

.container .box .ticket-list .item.checked {
    border-color: #8200ff;
}

.container .box .input {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16rpx;
}

.container .box .input .btn {
    width: 88rpx;
    height: 88rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10rpx;
    font-size: 43rpx;
    color: #8200ff;
    background-color: #e2dfe74d;
    user-select: none;
}

.container .box .input .number {
    width: 160rpx;
    text-align: center;
}

.container .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 60rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    background-color: #fff;
}

.container .foot .left {
    font-size: 40rpx;
    font-weight: bold;
}

.container .foot .btn {
    flex: 1;
    background-color: #8200ff;
    color: #fff;
    height: 88rpx;
    border-radius: 1000rpx;
    text-align: center;
    line-height: 88rpx;
    font-weight: bold;
    user-select: none;
}
</style>
