<template>
  <view class="item" @tap.stop.prevent="toDetail">
    <view class="item-box">
      <view class="left">
        <image :src="event.poster" mode="" />
        <view class="label">演唱会</view>
      </view>

      <view class="right">
        <view class="title">{{ event.activity_name }}</view>

        <view class="info">
          <view style="font-size: 24rpx">2024年12月</view>
          <view>
            <text style="color: red; font-weight: bold">¥{{ good.current_price ? good.current_price : '-' }}</text>
            <text style="font-size: 20rpx; margin-left: 8rpx">起</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    event: Object,
    good: Object
  },
  methods: {
    toDetail() {
      uni.navigateTo({
        url: '/pages/event/event'
      })
    }
  },
  created: function () {}
}
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
  height: 200rpx;
}

.item .item-box .left {
  width: 152rpx;
  height: 100%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item .item-box .right .title {
  font-size: 34rpx;
  font-weight: 500;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #606060;
}
</style>
