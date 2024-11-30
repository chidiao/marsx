<template>
  <view class="page">
    <view class="padding-xl">
      <button class="cu-btn bg-red block lg" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        一键登录
      </button>
    </view>
  </view>
</template>

<script>
import { wechatRegister } from '@/apis/user'
const app = getApp()
export default {
  data() {
    return {
      token: null,
      userInfo: null,
      need_mobile: 0
    }
  },
  onLoad(options) {
    this.getGlobalData()
  },
  methods: {
    getGlobalData() {
      this.token = app.globalData.token
      this.userInfo = app.globalData.userInfo
      this.need_mobile = app.globalData.need_mobile
    },
    getPhoneNumber(e) {
      const { code } = e.detail
      if (code) {
        this.register(code)
      } else {
        uni.showToast({
          title: '必须授权手机号才能登陆',
          icon: 'none'
        })
      }
    },
    async register(code) {
      try {
        uni.showLoading({
          title: '登录中...'
        })
        const wx_open_id = app.globalData.wx_open_id
        const { data } = await wechatRegister({
          js_code: code,
          wx_open_id: wx_open_id
        })
        app.setGlobalData('token', data.token)
        app.setGlobalData('userInfo', data.user_info)
        app.setGlobalData('need_mobile', data.need_mobile)
        this.goBack()
      } finally {
        uni.hideLoading()
      }
    },
    goBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        uni.navigateBack({
          delta: 1
        })
      } else {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }
    }
  }
}
</script>

<style>
/* pages/mine/login.wxss */
</style>
