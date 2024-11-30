<template>
    <view class="item" @tap.stop.prevent="toDetail">
        <view class="item-box">
            <view class="left">
                <image :src="news.image" mode="aspectFill" />
            </view>

            <view class="right">
                <view class="title">{{ news.title }}</view>

                <view class="info">
                    <view style="font-size: 24rpx">{{ formattedDate }}</view>
                    <!-- <view>
          <text style="color: red;font-weight: bold;">¥{{good.current_price}}</text>
          <text style="font-size: 20rpx;"> 起</text>
        </view> -->
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formattedDate: ''
        };
    },

    props: {
        news: Object
    },

    watch: {
        news: function (res) {
            const date = new Date(res.date * 1000); // 将时间戳转换为毫秒
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hour = date.getHours().toString().padStart(2, '0');
            const minute = date.getMinutes().toString().padStart(2, '0');
            const second = date.getSeconds().toString().padStart(2, '0');
            this.setData({
                formattedDate: `${year}-${month}-${day} ${hour}:${minute}:${second}`
            });
        }
    },

    methods: {
        toDetail() {
            uni.openOfficialAccountArticle({
                url: this.news.link
            });
        }
    },

    created: function () {}
};
</script>
<style>
.item {
    background-color: #fff;
    width: 100%;
    padding: 20rpx 16rpx;
    box-sizing: border-box;
    border-radius: 12rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
}

.item .item-box {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 24rpx;
    width: 100%;
}

.item .item-box .left {
    width: 152rpx;
    height: 152rpx;
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
}

.item .item-box .left image {
    width: 100%;
    height: 100%;
}

.item .item-box .left .label {
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

.item .item-box .right {
    flex: 1;
    height: 152rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item .item-box .right .title {
    font-size: 30rpx;
    font-weight: 500;
}

.info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #606060;
}
</style>
