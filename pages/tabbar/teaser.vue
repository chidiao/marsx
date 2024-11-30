<template>
    <!-- pages/teaser/teaser.wxml -->
    <view class="container">
        <swiper class="swiper" :indicator-dots="true" circular indicator-active-color="#D2FA00">
            <swiper-item v-for="(item, index) in 3" :key="index">
                <view class="swiper-item">
                    <image src="/static/images/sucai.jpg" mode="" />
                </view>
            </swiper-item>
        </swiper>

        <view class="item">
            <image src="/static/images/sucai2.jpg" mode="" />
            <view class="btns">
                <view class="badge">
                    <image src="/static/images/star_black.png" mode="" />
                    当前演出购票
                </view>
                <view class="arrow">
                    <image src="/static/images/arrow-right.png" mode="" />
                </view>
            </view>
        </view>
        <view class="item">
            <image src="/static/images/sucai3.jpg" mode="" />
            <view class="btns">
                <view class="badge">
                    <image src="/static/images/star_black.png" mode="" />
                    每日扭蛋
                </view>
                <view class="arrow">
                    <image src="/static/images/arrow-right.png" mode="" />
                </view>
            </view>
        </view>
        <view class="item">
            <image src="/static/images/sucai2.jpg" mode="" />
            <view class="btns">
                <view class="badge">
                    <image src="/static/images/star_black.png" mode="" />
                    当前演出购票
                </view>
                <view class="arrow">
                    <image src="/static/images/arrow-right.png" mode="" />
                </view>
            </view>
        </view>
        <view class="item">
            <image src="/static/images/sucai3.jpg" mode="" />
            <view class="btns">
                <view class="badge">
                    <image src="/static/images/star_black.png" mode="" />
                    每日扭蛋
                </view>
                <view class="arrow">
                    <image src="/static/images/arrow-right.png" mode="" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/teaser/teaser.js
export default {
    data() {
        return {};
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
    methods: {}
};
</script>
<style>
/* pages/teaser/teaser.wxss */
.container {
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
}

.swiper {
    width: 100%;
    border-radius: 20rpx;
    overflow: hidden;
    height: 560rpx;
}

.swiper .swiper-item {
    height: 100%;
}

.swiper .swiper-item image {
    width: 100%;
    height: 100%;
}

.container .item {
    margin-top: 64rpx;
    border-radius: 20rpx;
    overflow: hidden;
    position: relative;
    height: 240rpx;
    width: 100%;
}

.container .item > image {
    width: 100%;
    height: 100%;
}

.container .item .btns {
    position: absolute;
    right: 24rpx;
    bottom: 24rpx;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 16rpx;
}

.container .item .btns .badge {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 12rpx;
    height: 60rpx;
    background-color: #d2fa00;
    border-radius: 1000rpx;
    color: #2d2d2d;
    font-size: 28rpx;
    font-weight: bold;
    padding: 0 28rpx;
}

.container .item .btns .badge > image {
    width: 24rpx;
    height: 24rpx;
}

.container .item .btns .arrow {
    width: 60rpx;
    height: 60rpx;
    background-color: #2d2d2d;
    border-radius: 1000rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container .item .btns .arrow > image {
    width: 32rpx;
    height: 32rpx;
}
</style>
