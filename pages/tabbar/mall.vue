<template>
  <view class="container">
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view
          :class="'cu-item flex-sub ' + (item.category_uid == tab ? 'text-orange cur' : '')"
          :data-uid="item.category_uid"
          @tap.stop.prevent="clickTab"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.category_name }}
        </view>
      </view>
    </scroll-view>

    <block v-for="(item, index) in list" :key="index">
      <view class="list" v-if="item.category_uid == tab">
        <view
          class="item"
          :data-uid="good.goods_uid"
          @tap.stop.prevent="toDetail"
          v-for="(good, index1) in item.goods_list"
          :key="index1"
        >
          <view class="badge" :style="'background-color: ' + good.tag_arr[0].color + ';'"
            >{{ good.tag_arr[0].tag_name }}！</view
          >

          <view class="cover">
            <image :src="good.cover_text" mode="aspectFit" />
          </view>

          <view class="name">{{ good.goods_name }}</view>

          <view class="price">
            <view class="number">¥{{ good.current_price }}</view>
            <view class="add">+</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { getGoodsList } from '@/apis/mall.js'
export default {
  data() {
    return {
      list: [],
      tab: 0,
      good: {
        goods_uid: '',
        tag_arr: '',
        cover_text: '',
        goods_name: '',
        current_price: ''
      },
      color: '',
      tag_name: ''
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    toDetail(e) {
      const uid = e.currentTarget.dataset.uid
      uni.navigateTo({
        url: '/pages/mall/item?goods_uid=' + uid
      })
    },
    async getList() {
      try {
        const { data } = await getGoodsList()
        this.list = data?.list
        this.tab = data?.list[0].category_uid
      } catch {
        console.log('CatchClause')
        console.log('CatchClause')
      }
    },
    clickTab(event) {
      const { uid } = event.currentTarget.dataset
      this.tab = uid
    }
  }
}
</script>
<style>
.container {
  padding: 0 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
}

page {
  background: #fff;
}

.cover {
  width: 100%;
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cover image {
  width: 100%;
  height: 100%;
}

.container .title {
  width: 100%;
  font-size: 40rpx;
  text-align: left;
  font-style: italic;
  padding: 30rpx 0;
}

.container .list {
  width: 100%;
  display: grid;
  gap: 30rpx;
  grid-template-columns: 1fr 1fr;
  padding: 30rpx 0;
}

.container .list .item {
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 24rpx;
  overflow: hidden;
  padding: 32rpx;
  box-sizing: border-box;
}

.container .list .item .badge {
  display: inline-block;
  padding: 6rpx 12rpx;
  background-color: #eb5635;
  border-radius: 1000rpx;
  font-size: 20rpx;
  font-weight: bold;
  color: #2d2d2d;
}

.container .list .item .name {
  font-size: 24rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  margin-top: 40rpx;
  color: #2d2d2d;
}

.container .list .item .price {
  font-size: 30rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}

.container .list .item .price .add {
  font-size: 40rpx;
}
</style>
