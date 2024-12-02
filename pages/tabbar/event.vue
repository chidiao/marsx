<template>
  <view class="padding">
    <view class="event-item">
      <image :src="event.poster_text" mode="widthFix" />

      <view class="btns" @click="toEvent">
        <view class="badge">
          <image src="/static/img/star_black.png" mode="" />
          当前演出购票
        </view>

        <view class="arrow">
          <image src="/static/img/arrow-right.png" mode="" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getEventInfo } from '@/apis/event.js'

export default {
  data() {
    return {
      event: {}
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getEventInfo()
      this.event = data.info
    },
    toEvent() {
      uni.navigateTo({
        url: '/pages/event/event'
      })
    }
  }
}
</script>

<style>
page {
  background-color: #fff;
}

.event-item {
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 400rpx;
  background-color: rgba(0, 0, 0, 0.1);
}

.event-item > image {
  width: 100%;
  height: 100%;
  display: block;
}

.event-item .btns {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16rpx;
}

.event-item .btns .badge {
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

.event-item .btns .badge > image {
  width: 24rpx;
  height: 24rpx;
}

.event-item .btns .arrow {
  width: 60rpx;
  height: 60rpx;
  background-color: #2d2d2d;
  border-radius: 1000rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-item .btns .arrow > image {
  width: 32rpx;
  height: 32rpx;
}
</style>
