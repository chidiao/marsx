<template>
  <view class="container">
    <swiper class="swiper" :indicator-dots="true" circular indicator-active-color="#E33187">
      <swiper-item v-for="(item, index) in 3" :key="index">
        <view class="swiper-item">
          <image src="/static/images/sucai4.png" mode="" />
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
  import eventItem from '@/components/event-item/event-item';
  import newsItem from '@/components/news-item/news-item';
  import {
    getEventInfo
  } from '@/apis/event.js';
  import {
    news
  } from './data.js';
  export default {
    components: {
      eventItem,
      newsItem
    },
    data() {
      return {
        event: {
          show_goods_arr: ''
        },
        news
      };
    },
    onLoad() {
      this.getList();
      this.getNews();
    },
    methods: {
      async getList() {
        const {
          data
        } = await getEventInfo();
        this.setData({
          event: data.info
        });
      },

      getNews() {
        // wx.request({
        //   url: 'https://marsx.itopline.com/api/wx_news',
        //   method: 'GET',
        //   success: (res) => {
        //     console.log(res.data)
        //   }
        // })
      },

      toEvent() {
        uni.navigateTo({
          url: '/pages/event/event'
        });
      },

      toNoticeList: function() {
        uni.navigateTo({
          url: '/pages/notice/list'
        });
      },

      toConcertList: function() {
        uni.navigateTo({
          url: '/pages/concert/list'
        });
      }
    }
  };
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