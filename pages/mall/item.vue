<template>
  <view>
    <view class="container">
      <view style="width: 750rpx; height: 750rpx; display: flex; justify-content: center; align-items: center">
        <image style="width: 100%; height: 100%" :src="bannerUrl ? bannerUrl : good.cover_text" mode="aspectFit" />
      </view>

      <view class="box">
        <view class="title underline">{{ good.goods_name }}</view>
        <view class="info">
          <view class="item">名称：{{ good.goods_name }}</view>
          <view class="item">价格：¥{{ good.original_price }}</view>
          <view class="item">类型：{{ good.category_arr[0].category_name }}</view>
        </view>
      </view>
      <view class="box">
        <view class="title">商品介绍</view>
        <view class="content">
          <rich-text :nodes="good.goods_detail" />
        </view>
      </view>
      <view class="box">
        <view class="title">售后保障</view>
        <view class="content">
          <rich-text :nodes="good.service_after_sale" />
        </view>
      </view>

      <view class="foot">
        <view class="left">合计：{{ good.current_price }}</view>
        <view class="btn" @tap.stop.prevent="createOrder">立即购买</view>
      </view>
    </view>

    <!-- 客服modal -->
    <view :class="'cu-modal ' + (modal.kefu ? 'show' : '')">
      <view class="cu-dialog">
        <view class="padding-lg text-center text-xl text-bold">
          <view>{{ msg }}</view>
        </view>

        <view style="display: flex; align-items: center; gap: 30rpx; padding: 30rpx">
          <button class="cu-btn lg block bg-red" @tap.stop.prevent="onTapKefu">联系客服</button>
          <button class="cu-btn lg block" data-type="close" data-modal="kefu" @tap.stop.prevent="modalClick">
            确定
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getGoodInfo, createOrder } from '@/apis/mall.js'
export default {
  data() {
    return {
      goods_uid: '',

      good: {
        cover_text: '',
        goods_name: '',
        original_price: '',
        category_arr: '',
        goods_detail: '',
        service_after_sale: '',
        current_price: ''
      },

      bannerType: '',
      bannerUrl: '',

      modal: {
        kefu: false
      },

      msg: '',
      category_name: ''
    }
  },
  onLoad(opts) {
    this.goods_uid = opts.goods_uid
    this.getData()
  },
  methods: {
    showModal(modalName, params) {
      this[`modal.${modalName}`] = true
      if (params?.msg) {
        this.msg = params.msg
      }
    },
    closeModal(modalName) {
      if (!modalName) {
        this.closeAllModal()
      } else {
        this[`modal.${modalName}`] = false
      }
    },
    closeAllModal() {
      this.modal = {
        buy: false,
        kefu: false
      }
    },
    modalClick(event) {
      var type = event.target.dataset.type
      var modalName = event.target.dataset.modal
      if (type == 'close') {
        this.closeAllModal(modalName)
      }
    },
    async getData() {
      const { data } = await getGoodInfo(this.goods_uid)
      const banners = data.info.detail_banner_arr.filter((item) => item.type == 'image')
      const banner = banners[0]

      this.good = data.info
      this.bannerType = banner?.type
      this.bannerUrl = banner?.url
    },
    async createOrder() {
      if (!this.good.goods_uid) {
        return
      }
      const good = this.good
      const info = [
        {
          goods_uid: good.goods_uid,
          purchase_num: 1,
          goods_price: good.current_price,
          goods_name: good.goods_name
        }
      ]
      try {
        const { data } = await createOrder({
          goods_info: info
        })
        this.payNow(data.payment_detail)
      } catch {
        //
      }
    },
    async payNow(detail) {
      uni.requestPayment({
        timeStamp: detail.timeStamp + '',
        nonceStr: detail.nonceStr,
        package: detail.package,
        signType: detail.signType,
        paySign: detail.paySign,
        success: (res) => {
          this.showModal('kefu', {
            msg: '购买成功'
          })
        },
        fail: (res) => {
          this.showModal('kefu', {
            msg: '支付失败(' + res?.errMsg + ')'
          })
        }
      })
    },
    onTapKefu() {
      getApp().openKefu()
    }
  }
}
</script>
<style>
/* pages/merch/detail.wxss */
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
  height: 686rpx;
  object-fit: cover;
  border-radius: 20rpx;
  overflow: hidden;
}

.container .banner > image {
  width: 100%;
  height: 100%;
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
  font-size: 28rpx;
  color: #606060;
  line-height: 36rpx;
  margin-bottom: 8rpx;
}

.container .box .content {
  font-size: 24rpx;
  color: #606060;
  line-height: 36rpx;
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
