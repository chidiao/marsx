<template>
  <view>
    <no-data v-if="!list[0]"></no-data>

    <view class="padding-tb-sm" style="width: 100%;" v-if="list[0]">
      <view class="bg-white padding-sm margin-sm" style="border-radius: 10rpx" v-for="(item, index) in list" :key="index">
        <view class="flex justify-between align-center text-sm">
          <view>{{ item.order_sn }}</view>
          <view>{{ item.pay_status_text }}</view>
        </view>

        <view class="flex justify-between align-center" style="gap: 20rpx">
          <view class="flex align-center text-sm margin-tb-xs" style="gap: 20rpx">
            <view class="padding-sm" style="border-radius: 8rpx; background: rgba(0, 0, 0, 0.1); width: fit-content">
              <view class="text-xs text-bold flex justify-center align-center" style="width: 60rpx; height: 60rpx">MarsX</view>
            </view>
            <view>{{ item.package_text }}</view>
          </view>

          <view class="text-right">
            <view class="text-red text-bold">￥{{ item.price }}</view>
            <view class="text-xs">{{ item.pay_type_text }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import noData from '@/components/no-data/no-data'
import { getOrderList } from '@/apis/member.js'

export default {
  components: {
    noData
  },
  data() {
    return {
      list: []
    }
  },
  onShow() {
    this.list = []
    this.getList()
  },
  methods: {
    async getList() {
      console.log(getOrderList)
      const { data } = await getOrderList()
      this.setData({
        list: data.list
      })
    }
  }
}
</script>

<style></style>
