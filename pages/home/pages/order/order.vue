<template>
  <view style="background-color: #222">
    <view class="wrapper wrapper-order">
      <view class="empty text" v-if="!orderData[0]">暂无数据</view>
      <scroll-view :scroll-y="true" style="height: 88vh">
        <view class="cards" v-if="orderData[0]">
          <view class="card" v-for="(item, index) in orderData" :key="index">
            <view class="info info1">
              <view>
                <strong>订单号：</strong>
                <span>{{ item.order_sn }}</span>
              </view>
              <span v-if="item.pay_status != 20" style="padding: 2px 7px; background-color: #ee0a24; border-radius: 5px; font-size: 14px; word-break: keep-all">
                {{ item.pay_status_text }}
              </span>
              <span v-if="item.pay_status == 20" style="padding: 2px 7px; background-color: #07c160; border-radius: 5px; font-size: 14px; word-break: keep-all">
                {{ item.pay_status_text }}
              </span>
            </view>

            <view class="info">
              <strong>名称：</strong>
              {{ item.package_text }}
            </view>

            <view class="info">
              <strong>价格：</strong>
              ￥{{ item.price }}
            </view>

            <view class="info">
              <strong>支付方式：</strong>
              {{ item.pay_type_text }}
            </view>

            <view class="info">
              <strong>时间：</strong>
              {{ item.add_time_text }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
const Api = require('../../../../common/ajax.js')
export default {
  data() {
    return {
      orderData: []
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */ onLoad(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getOrderInfo()
  },
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
    getOrderInfo: function () {
      Api.request(
        'v1/order/lists',
        'POST',
        {
          page: 1,
          page_size: 100
        },
        (data) => {
          console.log(data) // 处理请求成功的逻辑
          uni.hideLoading()
          if (data?.data?.list) {
            this.setData({
              orderData: data?.data?.list
            })
          }
        },
        function (err) {
          console.error(err) // 处理请求失败的逻辑
        }
      )
    }
  }
}
</script>
<style>
.wrapper,
.wrapper-info {
  color: #fff;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
.wrapper-order .cards {
  width: 100%;
  margin: 0 auto;
}

.wrapper-order .cards .card {
  display: block;
  width: 300px;
  border-radius: 8px;
  padding: 15px;
  background-color: #141414cc;
  margin: 20px auto;
}

.wrapper-order .cards .card .info1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper-order .cards .card .btn {
  width: 250px;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.empty {
  color: #fff;
  font-size: 40rpx;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
