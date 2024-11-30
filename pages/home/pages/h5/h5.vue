<template>
    <!-- pages/home/pages/h5/h5.wxml -->
    <view class="container">
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
// pages/home/pages/h5/h5.js
export default {
    data() {
        return {
            urls: {
                default: 'https://download.itopline.com/privacy_policy.html',
                event: 'https://download.itopline.com/html/terms_and_conditions.html'
            },
            url: ''
        };
    },
    onLoad(opts) {
        if (opts.type == 'event') {
            this.setData({
                url: this.urls.event
            });
        } else {
            this.setData({
                url: this.urls.default
            });
        }
    },
    methods: {}
};
</script>
<style>
/* pages/home/pages/h5/h5.wxss */
</style>
