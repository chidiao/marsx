<template>
  <view class="page">
    <!-- 封面 -->
    <view style="width: 750rpx; display: flex; justify-content: center; padding: 10rpx 0">
      <image :src="event.poster_text" style="width: 600rpx" mode="widthFix" />
    </view>

    <!-- 富文本 -->
    <view class="text">
      <rich-text :nodes="event.activity_detail" />
    </view>

    <!-- 列表 -->
    <view class="btns">
      <view
        class="btn"
        :data-price="item.current_price"
        :data-uid="item.uid"
        @tap.stop.prevent="btnClick"
        v-for="(item, index) in event.show_goods_arr"
        :key="index"
      >
        <view class="btn_header" style="justify-content: space-between">
          <view class="btn_header">
            <image src="/static/assets/img/buy.png" style="width: 30rpx" mode="widthFix" />
            <view>{{ item.category_name }}</view>
          </view>

          <view style="flex-shrink: 0">
            <view>￥{{ item.current_price }}</view>
            <view
              class="text-gray"
              style="text-decoration: line-through"
              v-if="item.current_price != item.original_price"
              >￥{{ item.original_price }}</view
            >
          </view>
        </view>

        <view style="padding-bottom: 15rpx">
          <rich-text :nodes="item.detail" />
        </view>
      </view>
    </view>

    <!-- 其他 -->
    <view class="text" style="width: 100%">
      <view>主办机构</view>
      <view style="width: 100%; text-align: center; padding: 30rpx; font-size: 40rpx; font-weight: bold">MarsX</view>
      <navigator url="/pages/home/pages/h5/h5?type=event">
        <view
          style="
            width: 100%;
            padding: 30rpx 15rpx;
            border-width: 2rpx 0;
            border-style: solid;
            border-color: var(--gray);
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <view>活动条款</view>
          <view>→</view>
        </view>
      </navigator>
    </view>

    <view style="height: 180rpx"></view>
    <view
      style="
        width: 750rpx;
        padding: 30rpx;
        background: black;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        gap: 30rpx;
      "
    >
      <view
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          flex-shrink: 0;
          font-size: 20rpx;
        "
        @tap.stop.prevent="onTapKefu"
      >
        <image src="/static/assets/img/kefu.png" mode="widthFix" style="width: 50rpx" />
        <view>客服</view>
      </view>
      <button class="cu-btn bg-red block lg" style="width: 100%" @tap.stop.prevent="btnClick">
        {{ event.btn_text }}
      </button>
    </view>

    <!-- 购买modal -->
    <view
      :class="'cu-modal bottom-modal ' + (modal.buy ? 'show' : '')"
      data-type="close"
      data-modal="buy"
      @tap.stop.prevent="modalClick"
    >
      <view class="cu-dialog" style="background: #1e1e22; padding-top: 24rpx; border-radius: 24rpx 24rpx 0 0">
        <view class="ticket-label">选择入场券类型</view>
        <view class="text" style="gap: 16rpx">
          <view
            :class="'buy-item ' + (selectedItem.uid === item.uid ? 'active' : '')"
            :data-price="item.current_price"
            :data-uid="item.uid"
            @tap.stop.prevent="selectItem"
            v-for="(item, index) in event.purchasable_goods_arr"
            :key="index"
          >
            <view>{{ item.package_text }}</view>

            <view>￥{{ item.current_price }}</view>
          </view>
        </view>

        <view style="width: 750rpx; padding: 30rpx; display: flex">
          <button class="cu-btn bg-red block lg" style="width: 100%" @tap.stop.prevent="buyNow">立即支付</button>
        </view>
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
import { createOrder } from '@/apis/member.js'
import { getEventInfo, bookEvent } from '@/apis/event.js'

export default {
  data() {
    return {
      event: {
        poster_text: '',
        activity_detail: '',
        show_goods_arr: [],
        btn_text: '',
        purchasable_goods_arr: []
      },

      selectedItem: {
        uid: ''
      },

      modal: {
        buy: false,
        kefu: false
      },

      msg: '',
      default: ''
    }
  },
  onLoad: function () {
    this.getEvent()
  },
  methods: {
    showModal: function (modalName, params) {
      this.setData({
        [`modal.${modalName}`]: true
      })
      if (params?.msg) {
        this.setData({
          msg: params.msg
        })
      }
    },

    closeModal: function (modalName) {
      if (!modalName) {
        this.closeAllModal()
      } else {
        this.setData({
          [`modal.${modalName}`]: false
        })
      }
    },

    closeAllModal: function () {
      this.setData({
        modal: {
          buy: false,
          kefu: false
        }
      })
    },

    modalClick: function (event) {
      var type = event.target.dataset.type
      var modalName = event.target.dataset.modal
      if (type == 'close') {
        this.closeAllModal(modalName)
      }
    },

    selectItem: function (event) {
      var data = event.currentTarget.dataset
      console.log(data)
      this.setData({
        selectedItem: data
      })
    },

    buyNow: function () {
      if (!this.selectedItem.uid) {
        return uni.showToast({
          title: '请选择商品',
          icon: 'none'
        })
      }
      this.goPay()
    },

    btnClick: function (event) {
      var that = this
      var operateType = that.event.operate_type
      var isBooking = that.event.is_booking
      var uid = event.currentTarget.dataset.uid
      var price = event.currentTarget.dataset.price
      that.setData({
        selectedItem: {
          uid,
          price
        }
      })
      if (operateType === 1 && !isBooking) {
        if (uid) {
          return
        }
        that.bookEvent()
      } else if (operateType === 2) {
        that.showModal('buy')
      }
    },

    async bookEvent() {
      await bookEvent(this.event.uid)
      this.getEvent()
    },

    async getEvent() {
      const res = await getEventInfo()
      const info = res.data.info
      this.event = info
      this.default = info.purchasable_goods_arr[0]
    },

    async goPay() {
      var that = this
      const price = this.selectedItem.price
      const uid = this.selectedItem.uid

      const data = await createOrder({
        pay_type: 1,
        price: price,
        member_package_uid: uid
      })

      if (data?.data?.payment_detail) {
        uni.requestPayment({
          timeStamp: data?.data?.payment_detail.timeStamp + '',
          nonceStr: data?.data?.payment_detail.nonceStr,
          package: data?.data?.payment_detail.package,
          signType: data?.data?.payment_detail.signType,
          paySign: data?.data?.payment_detail.paySign,
          success: function (res) {
            console.log('支付成功')
            that.showModal('kefu', {
              msg: '购票成功，请联系客服'
            })
          },
          fail: function (res) {
            console.log('支付失败', res)
            that.showModal('kefu', {
              msg: '支付失败(' + res?.errMsg + ')'
            })
          }
        })
      }
    },

    onTapKefu: function () {
      uni.openCustomerServiceChat({
        extInfo: {
          url: 'https://work.weixin.qq.com/kfid/kfce2066ab53e9c7c8c'
        },
        corpId: 'wwecca02016493a6cb',
        success(res) {}
      })
    }
  }
}
</script>
<style>
.page {
  --gray: #808080;

  background-color: #000;
  width: 750rpx;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}

.text-gray {
  color: var(--gray);
}

.text {
  color: white;
  font-size: 24rpx;
  padding: 30rpx;
  display: grid;
  gap: 8rpx;
}

.btns {
  width: 750rpx;
  padding: 30rpx;
  display: grid;
  gap: 30rpx;
}

.btn {
  color: white;
  width: 100%;
  border: 1px solid var(--gray);
  padding: 15rpx;
  font-size: 24rpx;
}

.btn_header {
  --gap: 15rpx;

  display: flex;
  align-items: center;
  gap: var(--gap);
  padding: 15rpx;
}

.list-item {
  margin: 8rpx 0;
  padding: 0 32rpx;
  position: relative;
}

.list-item::before {
  --size: 12rpx;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  content: '';
  background: white;
  position: absolute;
  left: 4rpx;
  top: 10rpx;
}

.buy-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8rpx;
  padding: 16rpx;
  transition: all 0.3s;
  border: 1px solid gray;
}

.buy-item.active {
  border: 1px solid #eb5635;
}

.buy-btn {
  background: red;
  color: white;
  padding: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  border-radius: 99rpx;
}

.ticket-label {
  text-align: left;
  color: white;
  margin: 0 30rpx;
}
</style>
