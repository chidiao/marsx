<template>
  <view class="container">
    <swiper class="swiper" :indicator-dots="true" circular indicator-active-color="#E33187">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <view class="swiper-item">
          <image :src="item.resource_text" mode="aspectFill" />
        </view>
      </swiper-item>
    </swiper>

    <view class="block margin-top">
      <view class="block-title">演出预告</view>

      <view>
        <event-item :event="event" :good="event.show_goods_arr[0]"></event-item>
      </view>
    </view>

    <view class="block">
      <view class="block-title">最新资讯</view>

      <view>
        <news-item :news="item" v-for="(item, index) in news" :key="index"></news-item>
      </view>
    </view>
  </view>
</template>

<script>
import { getHomeBanner } from '@/apis/common.js'
import { getEventInfo } from '@/apis/event.js'
import { news } from './data.js'
export default {
  data() {
    return {
      event: {
        show_goods_arr: ''
      },
      banners: [],
      news
    }
  },
  onLoad() {
    this.getList()
    this.getBanner()
    this.getNews()
  },
  methods: {
    async getList() {
      const { data } = await getEventInfo()
      this.event = data.info
    },
    async getBanner() {
      const { data } = await getHomeBanner()
      this.banners = data.list
    },
    getNews() {
      //
    },
    toEvent() {
      uni.navigateTo({
        url: '/pages/event/event'
      })
    },
    toNoticeList: function () {
      uni.navigateTo({
        url: '/pages/notice/list'
      })
    },
    toConcertList: function () {
      uni.navigateTo({
        url: '/pages/concert/list'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 32rpx;
  box-sizing: border-box;
  background-color: #f9f9f9;
  width: 100%;
}

.swiper {
  width: 100%;
  border-radius: 10rpx;
  overflow: hidden;
  height: 300rpx;
}

.swiper .swiper-item {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.swiper .swiper-item image {
  width: 100%;
  height: 100%;
}

.block {
  width: 100%;
}

.block-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 34rpx;
  padding: 20rpx 10rpx;
}
</style>
