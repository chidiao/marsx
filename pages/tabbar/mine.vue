<template>
  <view class="container">
    <view class="user-box top">
      <view class="info" v-if="userInfo.id">
        <image :src="userInfo.avatar_text" mode="" />
        <view class="right">
          <view class="name">{{ userInfo.user_nickname }}</view>
          <view class="phone">{{ userInfo.mobile }}</view>
        </view>
      </view>

      <view class="padding-lg" v-else>
        <button class="cu-btn bg-red block round lg" @tap.stop.prevent="toLogin">登录</button>
      </view>

      <!-- <view class="box">
      <view class="item">
        <view class="number">7</view>
        <view class="label">门票</view>
      </view>
      <view class="item">
        <view class="number">5</view>
        <view class="label">优惠券</view>
      </view>
      <view class="item">
        <view class="number">630</view>
        <view class="label">钻石</view>
      </view>
      <view class="item">
        <view class="number">857</view>
        <view class="label">算力</view>
      </view>
    </view> -->
    </view>

    <view class="list">
      <view class="item" data-url="/pages/mine/order" @tap.stop.prevent="clickItem">
        <view class="label">我的订单</view>
        <view class="icon">
          <image src="/static/img/arrow.png" mode="" />
        </view>
      </view>
      <view class="item" data-url="/pages/mall/orders" @tap.stop.prevent="clickItem">
        <view class="label">商城订单</view>
        <view class="icon">
          <image src="/static/img/arrow.png" mode="" />
        </view>
      </view>
      <view class="item" @tap.stop.prevent="onTapKefu">
        <view class="label">加入粉丝群</view>
        <view class="icon">
          <image src="/static/img/arrow.png" mode="" />
        </view>
      </view>
    </view>

    <view class="" style="width: 100%; padding: 50rpx 0" v-if="userInfo">
      <button class="cu-btn bg-red lg block" @tap.stop.prevent="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
const app = getApp()
export default {
  data() {
    return {
      token: null,
      userInfo: {
        id: '',
        avatar_text: '',
        user_nickname: '',
        mobile: ''
      }
    }
  },
  onShow() {
    this.refreshData()
  },
  onPullDownRefresh() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      this.token = app.globalData.token
      this.userInfo = app.globalData.userInfo
    },
    toLogin() {
      this.refreshData()
      if (this.userInfo) {
        return
      }
      uni.navigateTo({
        url: '/pages/mine/login'
      })
    },
    logout() {
      getApp().marsXLogout()
      this.refreshData()
    },
    clickItem(event) {
      const { url } = event.currentTarget.dataset
      uni.navigateTo({
        url
      })
    },
    onTapKefu() {
      getApp().openKefu()
    }
  }
}
</script>
<style>
/* pages/my/my.wxss */
.container {
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.user-box {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0rpx 24rpx 24rpx 0rpx rgba(0, 0, 0, 0.05);
}

.user-box .info {
  padding: 21rpx 28rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 44rpx;
}

.user-box .info > image {
  width: 152rpx;
  height: 152rpx;
  border-radius: 50%;
}

.user-box .info .right {
  flex: 1;
  color: #606060;
  font-size: 24rpx;
}

.user-box .info .right .name {
  margin-bottom: 24rpx;
  font-size: 34rpx;
  font-weight: bold;
  color: #000;
}

.user-box .box {
  padding: 44rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 24rpx;
}

.user-box .box .item {
  flex: 1;
  text-align: center;
  color: #999999;
  font-size: 28rpx;
  font-weight: bold;
}

.user-box .box .item .number {
  color: #2d2d2d;
  margin-bottom: 16rpx;
}

.list {
  width: 100%;
  margin-top: 32rpx;
  box-shadow: 0rpx 24rpx 24rpx 0rpx rgba(0, 0, 0, 0.05);
  border-radius: 16rpx;
  overflow: hidden;
}

.list .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32rpx;
  color: #2d2d2d;
  padding: 32rpx;
  box-sizing: border-box;
  gap: 32rpx;
  background: #fff;
  border-bottom: 1px solid #f9f9f9;
}

.list .item:last-child {
  border-bottom: none;
}

.list .item .icon image {
  width: 32rpx;
  height: 32rpx;
}
</style>
