<template>
  <view class="no-data">
    <image src="/static/img/no-data.png" mode="widthFix" />
    <view>{{ msg ? msg : '暂无记录' }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    msg: String
  },
  methods: {},
  created: function () {}
}
</script>
<style>
.no-data {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  gap: 30rpx;
}

.no-data image {
  width: 200rpx;
}
</style>
