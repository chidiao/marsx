<template>
    <!-- pages/notice/list.wxml -->
    <view class="container">
        <view class="list">
            <view class="item item2" @tap="toDetail">
                <view class="item-box">
                    <view class="left">
                        <image src="/static/images/sucai5.png" mode="" />
                    </view>
                    <view class="right">
                        <view class="title">重要！！！泰勒斯威夫特-2025线上演唱会延期通知</view>
                        <view class="info">
                            <view class="date">2023/xx/xx - 2023/xx/xx</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="item item2" @tap="toDetail">
                <view class="item-box">
                    <view class="left">
                        <image src="/static/images/sucai5.png" mode="" />
                    </view>
                    <view class="right">
                        <view class="title">重要！！！泰勒斯威夫特-2025线上演唱会延期通知</view>
                        <view class="info">
                            <view class="date">2023/xx/xx - 2023/xx/xx</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/notice/list.js
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
    methods: {
        toDetail() {
            console.log('占位：函数 toDetail 未声明');
        }
    }
};
</script>
<style>
/* pages/notice/list.wxss */
.container {
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #f9f9f9;
    width: 100%;
    min-height: 100vh;
}

.list .item {
    background-color: #fff;
    padding: 20rpx 16rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
}

.list .item .item-box {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 24rpx;
    height: 200rpx;
}

.list .item2 .item-box {
    height: 152rpx;
}

.list .item .item-box .left {
    width: 152rpx;
    height: 100%;
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
}

.list .item .item-box .left image {
    width: 100%;
    height: 100%;
}

.list .item .item-box .left .label {
    position: absolute;
    bottom: 12rpx;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 20rpx;
    color: #fff;
    line-height: 40rpx;
    background-color: rgba(0, 0, 0, 0.4);
}

.list .item .item-box .left .badge {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    gap: 4rpx;
    background-color: #e33187;
    font-size: 20rpx;
    color: #ffffff;
    padding: 4rpx 8rpx;
    border-bottom-left-radius: 12rpx;
}

.list .item .item-box .left .badge image {
    width: 12rpx;
    height: 12rpx;
}

.list .item .item-box .left .badge text text {
    font-weight: bold;
    font-size: 26rpx;
}

.list .item .item-box .right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.list .item .item-box .right .title {
    font-size: 34rpx;
    font-weight: 500;
}

.list .item .item-box .right .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24rpx;
    color: #606060;
}

.list .item .item-box .right .info .price text {
    color: #e33187;
    font-weight: bold;
}

.list .item .item-box .right .info .price text text {
    font-size: 34rpx;
}
</style>
