<template>
    <!-- pages/concert/detail.wxml -->
    <view class="container">
        <view class="banner">
            <image src="/static/images/sucai6.png" mode="" />
        </view>
        <view class="box">
            <rich-text :nodes="detail" />
        </view>
        <!-- 列表 -->
        <view class="list">
            <view class="btn" :data-uid="item.uid" @tap.stop.prevent="btnClick" v-for="(item, index) in show_goods_arr" :key="index">
                <view class="btn_header" style="justify-content: space-between">
                    <view class="btn_header">
                        <image src="/static/images/buy.png" style="width: 30rpx" mode="widthFix" />
                        <view>{{ item.category_name }}</view>
                    </view>

                    <view style="flex-shrink: 0">
                        <view>￥{{ item.current_price }}</view>
                        <view class="text-gray" style="text-decoration: line-through" v-if="item.current_price != item.original_price">￥{{ item.original_price }}</view>
                    </view>
                </view>

                <view style="width: 100%; padding-bottom: 15rpx">
                    <rich-text :nodes="item.detail" />
                </view>
            </view>
        </view>
        <view class="text" style="margin-top: 32rpx; width: 100%">
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
        <!-- 购买modal -->
        <view :class="'cu-modal bottom-modal ' + (showBuyModal ? 'show' : '')" data-type="close" data-modal="buy" @tap.stop.prevent="closeModal">
            <view class="cu-dialog" style="background: #fff; padding-top: 24rpx; border-radius: 24rpx 24rpx 0 0; color: #2d2d2d; padding: 32rpx">
                <view class="ticket-label">选择入场券类型</view>
                <view class="box" style="gap: 16rpx">
                    <view
                        :class="'buy-item ' + (selectedItemUid === item.uid ? 'active' : '')"
                        :data-uid="item.uid"
                        @tap.stop.prevent="selectItem"
                        v-for="(item, index) in purchasable_goods_arr"
                        :key="index"
                    >
                        <view>{{ item.package_text }}</view>

                        <view>￥{{ item.current_price }}</view>
                    </view>
                </view>

                <view style="width: 100%; display: flex; margin-top: 32rpx">
                    <button
                        style="width: 100%; background-color: #8200ff; color: #fff; border-radius: 1000rpx; height: 88rpx; line-height: 88rpx; padding: 0"
                        @tap.stop.prevent="buyNow"
                    >
                        立即支付
                    </button>
                </view>
            </view>
        </view>
        <view class="foot">
            <view class="left">客服</view>
            <view class="btn" @tap="showModal">立即购买</view>
        </view>
    </view>
</template>

<script>
// pages/concert/detail.js
export default {
    data() {
        return {
            showBuyModal: false,
            selectedItemUid: '',
            detail: '<p style="font-size: 1.5em;margin: 0.5em 0;">MarsX“ 未来空间站.想和您一起唱” 音乐会首发 </p> <p style = "color: gray;margin: 1em 0; line-height:2" >MarsX 主题音乐会即将迎来一位神秘嘉宾， 带来一场前所未有的震撼演出。 不同于以往的音乐盛典， 这场活动融合更多惊喜和神秘元素， 音符的每一次跳动都与时空交织， 回响着未知的旋律。 每一段音乐， 似乎都在讲述一个故事传递一份情感， 穿越山海为您而来。 而那位即将到来的神秘音乐使者， 将启动我和我们的亲朋好友们共赴一场听觉和视觉的盛宴。 同时也是一次神秘而未知的探索， 一次与偶像面对面的奇趣珍贵体验， 准备好迎接这场音符狂欢震撼人心的音乐之旅吧。 </p> <p style = "font-size: 1.3em;margin: 1em 0;" >音乐会时间 </p> <p style = "color:gray;margin: 0.5em 0;" >2024 年12月8日 20: 00 - 21: 00 </p> <p style = "color:gray;margin: 0.5em 0;" >入场时间： 2024 年12月8日19: 00 </p> <p style = "font-size: 1.3em;margin: 1em 0;" >音乐会入场券 </p>',
            purchasable_goods_arr: [
                {
                    uid: '6736e34c1e816',
                    package_text: '普通票',
                    category_name: '普通票',
                    original_price: '38.00',
                    current_price: '38.00',
                    sort: 70,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n    </ul>\r\n  </div>'
                },
                {
                    uid: '6736eac965aba',
                    package_text: 'VIP票（男性专属服饰）',
                    category_name: 'VIP票',
                    original_price: '168.00',
                    current_price: '168.00',
                    sort: 69,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n      <li>指定专供：专供服饰一套（自主选择男女款）</li>\r\n      <li>专属粉丝群：进入VIP粉丝群</li>\r\n    </ul>\r\n  </div>'
                },
                {
                    uid: '6736eadf2ec01',
                    package_text: '至尊票（男性专属服饰+女性高奢限量服饰一套）',
                    category_name: '至尊票',
                    original_price: '1888.00',
                    current_price: '1888.00',
                    sort: 59,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n      <li>指定专供：专供服饰一套（数字人线上服饰）自主选择男女款</li>\r\n      <li>明星同款：高奢限量服饰一套（数字人线上服饰）</li>\r\n      <li>免费抽奖一次：音乐会现场抽奖名额一次</li>\r\n      <li>全场最耀眼权益</li>\r\n      <li>第二场明星音乐会直通入场资格（平台指定）</li>\r\n    </ul>\r\n  </div>'
                },
                {
                    uid: '673f1b7f0e03d',
                    package_text: 'VIP票（女性专属服饰）',
                    category_name: 'VIP票',
                    original_price: '168.00',
                    current_price: '168.00',
                    sort: 68,
                    detail: '<p>\r\n    <span class="text-only" style="white-space-collapse: preserve;"></span>\r\n</p>\r\n<ul class="richTextDocs-unOrderList richTextDocs-unOrderList-disc list-paddingleft-2">\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">入场资格：享受线上音乐活动，优先参与互动环节</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">专属形象：提供男女分开设计的专属虚拟形象，供现场互动使用</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">音乐内容：享受特别定制的幕后花絮和创作过程分享</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">专属粉丝群：进入VIP粉丝群，与其他VIP观众和嘉宾进行专属互动</span>\r\n        </p>\r\n    </li>\r\n</ul>\r\n<p>\r\n    <span class="text-only" style="white-space-collapse: preserve;"></span><br/>\r\n</p>\r\n<p>\r\n    <br/>\r\n</p>'
                },
                {
                    uid: '673f1bc6c4bb4',
                    package_text: '至尊票（女性专属服饰+女性高奢限量服饰一套）',
                    category_name: '至尊票',
                    original_price: '1888.00',
                    current_price: '1888.00',
                    sort: 58,
                    detail: '<ul class="richTextDocs-unOrderList richTextDocs-unOrderList-disc list-paddingleft-2">\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">入场资格：享受线上音乐活动，优先参与互动环节</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">专属形象：提供男女分开设计的专属虚拟形象，并解锁更多装扮选项</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">实体礼物：获得精美限量版实体礼物（例如定制T恤、海报或专辑）</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">专属祝福：获得神秘嘉宾的专属祝福视频，带来独特的定制化问候</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">数字合影：与神秘嘉宾进行数字合影，留存这一难忘的时刻</span>\r\n        </p>\r\n    </li>\r\n    <li>\r\n        <p>\r\n            <span class="text-only" style="white-space-collapse: preserve;">赠送回放：演出结束后，赠送限量版高清演唱会回放，收藏永久保留</span>\r\n        </p>\r\n    </li>\r\n</ul>'
                }
            ],
            show_goods_arr: [
                {
                    uid: '6736e34c1e816',
                    package_text: '普通票',
                    category_name: '普通票',
                    original_price: '38.00',
                    current_price: '38.00',
                    sort: 70,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n    </ul>\r\n  </div>'
                },
                {
                    uid: '6736eac965aba',
                    package_text: 'VIP票（男性专属服饰）',
                    category_name: 'VIP票',
                    original_price: '168.00',
                    current_price: '168.00',
                    sort: 69,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n      <li>指定专供：专供服饰一套（自主选择男女款）</li>\r\n      <li>专属粉丝群：进入VIP粉丝群</li>\r\n    </ul>\r\n  </div>'
                },
                {
                    uid: '6736eadf2ec01',
                    package_text: '至尊票（男性专属服饰+女性高奢限量服饰一套）',
                    category_name: '至尊票',
                    original_price: '1888.00',
                    current_price: '1888.00',
                    sort: 59,
                    detail: '<div style="color: #aaa;">\r\n  <ul style="font-size: 1.1em;line-height:1.4;list-style: disc;margin-left: 1em;">\r\n      <li>入场资格：明星音乐会专场</li>\r\n      <li>专属：沉浸式体验</li>\r\n      <li>指定专供：专供服饰一套（数字人线上服饰）自主选择男女款</li>\r\n      <li>明星同款：高奢限量服饰一套（数字人线上服饰）</li>\r\n      <li>免费抽奖一次：音乐会现场抽奖名额一次</li>\r\n      <li>全场最耀眼权益</li>\r\n      <li>第二场明星音乐会直通入场资格（平台指定）</li>\r\n    </ul>\r\n  </div>'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
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
        showModal: function () {
            this.setData({
                showBuyModal: true
            });
        },

        closeModal: function () {
            this.setData({
                showBuyModal: false
            });
        },

        btnClick: function (event) {
            var uid = event.currentTarget.dataset.uid;
            this.setData({
                selectedItemUid: uid
            });
            this.showModal();
        },

        selectItem: function (e) {
            var uid = e.currentTarget.dataset.uid;
            this.setData({
                selectedItemUid: uid
            });
        },

        buyNow() {
            console.log('占位：函数 buyNow 未声明');
        }
    }
};
</script>
<style>
/* pages/concert/detail.wxss */
.container {
    padding: 32rpx;
    padding-bottom: 184rpx;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.container .banner {
    position: relative;
    width: 100%;
    height: 927rpx;
    object-fit: cover;
    border-radius: 20rpx;
    overflow: hidden;
}

.container .banner > image {
    width: 100%;
    height: 100%;
}

.container .box {
    margin-top: 32rpx;
    width: 100%;
    font-size: 24rpx;
    display: grid;
    gap: 8rpx;
}

.list {
    width: 100%;
    display: grid;
    gap: 30rpx;
}

.list .btn {
    width: 100%;
    border: 1px solid #8200ff;
    padding: 15rpx;
    font-size: 24rpx;
    border-radius: 20rpx;
}

.list .btn .btn_header {
    --gap: 15rpx;
    display: flex;
    align-items: center;
    gap: var(--gap);
    padding: 15rpx;
}

.buy-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8rpx;
    padding: 16rpx;
    transition: all 0.3s;
    border: 1px solid #999;
}

.buy-item.active {
    border: 1px solid #8200ff;
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
    padding: 0 32rpx 32rpx;
    box-sizing: border-box;
    background-color: #fff;
}

.container .foot .left {
    font-size: 32rpx;
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

/* ==================
         模态窗口
 ==================== */

.cu-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1110;
    opacity: 0;
    outline: 0;
    text-align: center;
    -ms-transform: scale(1.185);
    transform: scale(1.185);
    backface-visibility: hidden;
    perspective: 2000rpx;
    background: rgba(0, 0, 0, 0.6);
    transition: all 0.3s ease-in-out 0s;
    pointer-events: none;
}

.cu-modal::before {
    content: '\200B';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.cu-modal.show {
    opacity: 1;
    transition-duration: 0.3s;
    -ms-transform: scale(1);
    transform: scale(1);
    overflow-x: hidden;
    overflow-y: auto;
    pointer-events: auto;
}

.cu-dialog {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: auto;
    margin-right: auto;
    width: 680rpx;
    max-width: 100%;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    overflow: hidden;
}

.cu-modal.bottom-modal::before {
    vertical-align: bottom;
}

.cu-modal.bottom-modal .cu-dialog {
    width: 100%;
    border-radius: 0;
}

.cu-modal.bottom-modal {
    margin-bottom: -1000rpx;
}

.cu-modal.bottom-modal.show {
    margin-bottom: 0;
}

.cu-modal.drawer-modal {
    transform: scale(1);
    display: flex;
}

.cu-modal.drawer-modal .cu-dialog {
    height: 100%;
    min-width: 200rpx;
    border-radius: 0;
    margin: initial;
    transition-duration: 0.3s;
}

.cu-modal.drawer-modal.justify-start .cu-dialog {
    transform: translateX(-100%);
}

.cu-modal.drawer-modal.justify-end .cu-dialog {
    transform: translateX(100%);
}

.cu-modal.drawer-modal.show .cu-dialog {
    transform: translateX(0%);
}
.cu-modal .cu-dialog > .cu-bar:first-child .action {
    min-width: 100rpx;
    margin-right: 0;
    min-height: 100rpx;
}
</style>
