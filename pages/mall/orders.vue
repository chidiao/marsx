<template>
    <view class="page padding-xs">
        <no-data v-if="loadMore == false && list.length == 0"></no-data>

        <view class="bg-white padding-sm margin-sm" style="border-radius: 10rpx" v-for="(item, index) in list" :key="index">
            <view class="flex justify-between align-center text-sm">
                <view>{{ item.order_sn }}</view>
                <view>{{ item.order_status_text }}</view>
            </view>

            <view class="flex justify-between align-center" style="gap: 20rpx">
                <view class="flex align-center text-sm margin-tb-xs" style="gap: 20rpx">
                    <view class="padding-sm" style="border-radius: 8rpx; background: rgba(0, 0, 0, 0.1); width: fit-content">
                        <image :src="item.goods_list[0].goods_picture_text" style="width: 100rpx; height: 100rpx" mode="aspectFit" />
                    </view>
                    <view>{{ item.goods_list[0].goods_name }}</view>
                </view>

                <view class="text-right">
                    <view class="text-red text-bold">￥{{ item.total_price }}</view>
                    <view class="text-xs">{{ item.pay_type_text }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import noData from '@/components/no-data/no-data';
import { getOrderList } from '@/apis/mall';
export default {
    components: {
        noData
    },
    data() {
        return {
            list: [],
            page: 1,
            page_size: 10,
            loading: false,
            loadMore: true
        };
    },
    onLoad(options) {
        this.getList();
    },
    onReachBottom() {
        this.getList();
    },
    methods: {
        async getList() {
            if (this.loading) {
                return;
            }
            if (!this.loadMore) {
                return;
            }
            try {
                this.setData({
                    loading: true
                });
                const { data } = await getOrderList({
                    page: this.page
                });
                const list = data.order_list;
                this.setData({
                    list: [...this.list, ...list],
                    page: this.page++
                });
                if (list.length < this.page_size) {
                    this.setData({
                        loadMore: false
                    });
                }
            } finally {
                this.setData({
                    loading: false
                });
            }
        }
    }
};
</script>
<style>
/* pages/mall/orders.wxss */
</style>
