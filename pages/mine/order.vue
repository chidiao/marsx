<template>
  <view class="wrapper wrapper-order">
    <no-data v-if="!list[0]"></no-data>

    <scroll-view :scroll-y="true" style="height: 88vh">
      <view class="cards" v-if="list[0]">
        <view class="card" v-for="(item, index) in list" :key="index">
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
</template>

<script>
import noData from '@/components/no-data/no-data'
import { getOrderList } from '@/apis/member'
export default {
  components: {
    noData
  },
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await getOrderList()
      this.setData({
        list: data.list
      })
    }
  }
}
</script>
<style>
.wrapper,
.wrapper-info {
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
  padding: 0 30rpx;
}

.wrapper-order .cards .card {
  display: block;
  width: 100%;
  border-radius: 8px;
  padding: 15px;
  background-color: rgba(105, 102, 102, 0.1);
  margin: 30rpx auto;
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
