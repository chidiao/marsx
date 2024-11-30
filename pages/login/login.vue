<template>
  <view
    style="height: 100vh; width: 100vw; position: relative"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <view class="wrapper-info" v-if="show_info == 'info'">
      <view class="title-big">我的资料</view>
      <image class="close-icon" @tap="onTapClose" src="/static/pages/login/images/close.png" />
      <view class="card">
        <image class="avatar" src="https://h5-api.itopline.com/storage/default/avatar.png" />
        <view class="info">
          <strong>昵称：</strong>
          {{ user_nickname || '-' }}
        </view>
        <view class="info">
          <strong>手机号：</strong>
          {{ mobile || '-' }}
        </view>
        <view class="info">
          <strong>注册时间：</strong>
          {{ regist_time || '-' }}
        </view>
        <!-- <view class="info"><strong>会员等级：</strong>黄金会员</view>
      <view class="info"><strong>粉丝数：</strong>10，222</view>
      <view class="info"><strong>作品数：</strong>78</view> -->
      </view>
    </view>

    <view class="wrapper wrapper-order" v-if="show_info == 'order'">
      <view class="title-big">我的订单</view>
      <image class="close-icon" @tap="onTapClose" src="/static/pages/login/images/close.png" />
      <view class="empty text" v-if="!orderData[0]">暂无数据</view>
      <scroll-view :scroll-y="true" style="height: 72vh">
        <view class="cards" v-if="orderData[0]">
          <view class="card" v-for="(item, index) in orderData" :key="index">
            <view class="info info1">
              <view>
                <strong>订单号：</strong>
                <span>{{ item.order_sn }}</span>
              </view>
              <span
                v-if="item.pay_status != 20"
                style="
                  padding: 2px 7px;
                  background-color: #ee0a24;
                  border-radius: 5px;
                  font-size: 14px;
                  word-break: keep-all;
                "
              >
                {{ item.pay_status_text }}
              </span>
              <span
                v-if="item.pay_status == 20"
                style="
                  padding: 2px 7px;
                  background-color: #07c160;
                  border-radius: 5px;
                  font-size: 14px;
                  word-break: keep-all;
                "
              >
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

    <view :style="'background-color: #222;transform: translateY(' + translateY + 'vh);'" @tap="onTapCloseAll">
      <view class="content" v-if="show_content_page == 0">
        <view class="title">元宇宙创梦空间</view>
        <view class="desc">
          MarsX
          是一个元宇宙超媒生态平台,您可以在MarsX上观看不同艺术家们的线上沉浸式音乐会，以及接触不同地区的朋友，还可以在平台上分享您的音乐创作让更多的人聆听您创作的音乐，展现才艺，甚至定制您的专场音乐会。
        </view>
      </view>
      <video
        id="myVideo1"
        class="myVideo"
        object-fit="cover"
        :controls="false"
        :show-bottom-progress="false"
        loop
        :src="'https://static.itopline.com/videos/wap/bg/v1/cmkj.mp4?v=' + vedio_version"
      ></video>

      <view class="content page2" v-if="show_content_page == 1">
        <view class="title">AI智能体</view>
        <view class="desc">
          AI智能体将成为您在MarsX元宇宙世界里的数字形象分身，您可以通过与她互动，让她逐渐成长，通过高还原AI声音克隆，将您自己的声音赋予她，您还可以通过持续的训练和喂养，让她成为世界里的另一个您。
        </view>
      </view>
      <video
        id="myVideo2"
        class="myVideo"
        object-fit="cover"
        :controls="false"
        :show-bottom-progress="false"
        loop
        :src="'https://static.itopline.com/videos/wap/bg/v1/aiznt.mp4?v=' + vedio_version"
      ></video>

      <view class="content page3" v-if="show_content_page == 2">
        <view class="title">音乐擂台</view>
        <view class="desc">
          音乐擂台是所有音乐创作者发挥才华的舞台，您可以做将您创作的音乐，上传到音乐擂台，让更多的用户聆听，分享，收获您的音乐粉丝。您还可以通过音乐创作获得一定的收益哦。
        </view>
      </view>
      <video
        id="myVideo3"
        class="myVideo"
        object-fit="cover"
        :controls="false"
        :show-bottom-progress="false"
        loop
        :src="'https://static.itopline.com/videos/wap/bg/v1/yylt.mp4?v=' + vedio_version"
      ></video>

      <view class="content page4" v-if="show_content_page == 3">
        <view class="title">律动舞池</view>
        <view class="desc"
          >私域派对将为您提供线上聚会的场地，邀请朋友一起来MarsX
          元宇宙世界举办线上派对，加入律动舞池，互娱私域，让我们一起尽情律动放飞自我吧。</view
        >
      </view>
      <video
        id="myVideo4"
        class="myVideo"
        object-fit="cover"
        :controls="false"
        :show-bottom-progress="false"
        loop
        :src="'https://static.itopline.com/videos/wap/bg/v1/ldwc.mp4?v=' + vedio_version"
      ></video>

      <view class="content page5" v-if="show_content_page == 4">
        <view class="title">云演厅</view>
        <view class="desc">
          云演厅是大艺术家们开办音乐会和展示优秀作品的舞台，科技结合的超前线上沉浸式文化展现方式，让您告别时空的烦恼，随时随地即可亲临盛宴，与偶像和志同道合的朋友面对面。MarsX元宇宙即将迎来名家们地震撼登场，不要走丢踏空，及时的关注哦。
        </view>
      </view>
      <video
        id="myVideo5"
        class="myVideo"
        object-fit="cover"
        :controls="false"
        :show-bottom-progress="false"
        loop
        :src="'https://static.itopline.com/videos/wap/bg/v1/yyt.mp4?v=' + vedio_version"
      ></video>

      <view class="bg"></view>
    </view>

    <view class="con">
      <view class="title">
        <image class="img" src="/static/pages/login/images/logo.png" />
      </view>
      <view class="avatar-box" @tap.stop.prevent="onTapToogleMenu" v-if="show_user">
        <image class="avatar" src="https://h5-api.itopline.com/storage/default/avatar.png" />
        <view class="triangle" v-if="show_menu"></view>
        <view class="menu-box" v-if="show_menu">
          <view class="menu-item" @tap.stop.prevent="onTapMenu" data-type="info">我的资料</view>
          <view class="menu-item" @tap.stop.prevent="onTapMenu" data-type="order">我的订单</view>
          <view class="menu-item" @tap.stop.prevent="onTapMenu" data-type="logout">退出登录</view>
        </view>
      </view>
    </view>

    <view class="btns">
      <view v-if="show_login_btn" class="btn btn2" @tap.stop.prevent="onTapKefu">联系客服</view>
      <view v-if="show_user" class="btn btn2" @tap.stop.prevent="goEvent">音乐活动</view>
      <view v-if="show_login_btn && !show_user" class="btn btn2" @tap.stop.prevent="showLogin">用户登录</view>
      <view v-if="show_login_btn && platform == 'android' && show_user" class="btn btn2" @tap.stop.prevent="onTapLogin"
        >用户权益</view
      >
      <image class="arrow-icon" src="/static/images/arrow.png" />

      <view class="login-box" v-if="show_login_box && !show_user">
        <view class="agreement-label">
          <checkbox-group class="agreement-box" @change="checkboxChange">
            <checkbox :checked="agreement" />
          </checkbox-group>
          <text>
            我已阅读并同意
            <text class="agreement-yellow" @tap.stop.prevent="goPrivacyPolicy">《隐私协议》</text>
            <text class="agreement-yellow" @tap.stop.prevent="goAgreement">《用户协议》</text>
          </text>
        </view>
        <view v-if="show_login_btn && !show_user && need_mobile == 0" class="btn btn2" @tap.stop.prevent="onTapLogin"
          >一键登录</view
        >
        <button
          v-if="show_login_btn && !show_user && need_mobile == 1"
          class="btn btn2"
          open-type="getPhoneNumber"
          :disabled="!agreement"
          @getphonenumber="getPhoneNumber"
        >
          一键登录
        </button>
        <view class="btn btn2" @tap.stop.prevent="onTapCloseAll">取消登陆</view>
      </view>
    </view>
    <view class="wrapper-goods" v-if="show_user && packageData && platform == 'android' && show_info == 'goods'">
      <view style="display: flex; align-items: center; justify-content: space-between">
        <view style="font-size: 16px; font-weight: 500; padding: 10px 0px">选择商品</view>
        <image class="goods-close-icon" @tap="onTapClose" src="/static/pages/login/images/close.png" />
      </view>
      <view class="cards">
        <view class="card" v-for="(item, index) in packageData" :key="index">
          <view class="info">
            <view class="name">{{ item.package_text }}</view>
            <view class="price">
              ￥{{ item.current_price }}
              <span class="original_price" v-if="item.current_price != item.original_price"
                >￥{{ item.original_price }}</span
              >
            </view>
          </view>

          <view
            class="btn-buy btn-red"
            @tap.stop.prevent="goPay"
            :data-price="item.current_price"
            :data-uid="item.uid"
            v-if="item.status == 1"
            >购买</view
          >

          <view class="btn-buy btn-gray" v-if="item.status == 0">已购买</view>

          <view class="btn-buy btn-gray" @tap.stop.prevent="onTapPay" v-if="item.status == 2">不可购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// pages/login/login.js
const Api = require('../../common/ajax.js')
export default {
  data() {
    return {
      vedio_version: new Date().getTime(),
      show_login_box: false,
      agreement: false,
      show_login_btn: true,
      platform: 'ios',
      orderData: [],
      packageData: [],
      wx_open_id: '',
      need_mobile: -1,
      show_content_page: 0,
      show_user: false,
      show_info: '',

      //资料 info 商品 goods 订单 order
      show_menu: false,

      avatar: '',
      avatar_text: 'https://h5-api.itopline.com/storage/default/avatar.png',
      id: 0,
      invitation_code: '',
      last_login_ip: '',
      last_login_time: 0,
      mobile: '',
      regist_time: 0,
      signature: '',
      uid: 0,
      user_email: '',
      user_nickname: '',
      user_status: 1,
      translateY: 0,
      startY: 0,
      moveY: 0,
      isMoving: false,
      show_pay: false
    }
  },
  onReady() {
    const systemInfo = uni.getSystemInfoSync()
    this.reportLog(JSON.stringify(systemInfo))
    if (systemInfo.system.toLowerCase().includes('Android'.toLowerCase()) || systemInfo.platform == 'android') {
      this.setData({
        platform: 'android'
      })
    }
    this.onGetOpenId()
    this.videoContext1 = uni.createVideoContext('myVideo1')
    this.videoContext2 = uni.createVideoContext('myVideo2')
    this.videoContext3 = uni.createVideoContext('myVideo3')
    this.videoContext4 = uni.createVideoContext('myVideo4')
    this.videoContext5 = uni.createVideoContext('myVideo5')
    this.playVideo(1)
  },
  onUnload() {
    getApp().globalData.audioManager.stopBgSound1()
  },
  methods: {
    checkboxChange(e) {
      console.log(e.detail.value.length)
      if (e.detail.value.length) {
        console.log('选中')
        this.setData({
          agreement: true
        })
      } else {
        console.log('取消')
        this.setData({
          agreement: false
        })
      }
    },

    showLogin: function () {
      this.setData({
        show_login_box: true
      })
    },

    // 点击按钮时触发的事件
    goPrivacyPolicy: function () {
      setTimeout(() => {
        uni.hideLoading()
        uni.navigateTo({
          url: '/pages/home/pages/h5/h5'
        })
      }, 200)
    },

    goAgreement: function () {
      uni.navigateTo({
        url: '/pages/home/pages/h5_ag/h5ag'
      })
    },

    goEvent: function () {
      uni.navigateTo({
        url: '/pages/event/event'
      })
    },

    onTapClose: function () {
      this.setData({
        show_info: ''
      })
    },

    onTapKefu() {
      getApp().openKefu()
    },
    touchStart: function (event) {
      this.setData({
        moveY: 0,
        startY: event.touches[0].clientY
      })
    },

    touchMove: function (event) {
      if (this.show_info != '') {
        return
      }
      const moveY = event.touches[0].clientY - this.startY
      if (this.show_content_page == 4 && moveY < 0) {
        return
      }
      if (this.show_content_page == 0 && moveY > 0) {
        return
      }
      console.log(moveY)
      this.setData({
        moveY: moveY,
        translateY: this.show_content_page * -100 - 1 + moveY / 3
      })
    },

    touchEnd: function (event) {
      console.log('this.data.translateY', this.translateY, this.moveY)
      if (this.moveY < -60) {
        // 根据需要设置阈值
        let temp = this.show_content_page + 1
        if (temp > 4) {
          temp = 4
        }
        if (temp > 3) {
          this.setData({
            show_login_btn: true
          })
        }
        this.setData({
          translateY: temp * -100 - 1,
          show_content_page: temp
        })
        this.playVideo(temp + 1)
      } else if (this.moveY > 60) {
        // 根据需要设置阈值
        let temp = this.show_content_page - 1
        console.log('this.data.show_content_page,temp', this.show_content_page, temp)
        if (temp < 0) {
          temp = 0
        }
        this.setData({
          translateY: temp * -100,
          show_content_page: temp
        })
        this.playVideo(temp + 1)
      } else {
        this.setData({
          translateY: this.show_content_page * -100 - 1
        })
      }
    },

    onTapCloseAll: function () {
      //关闭各种弹窗
      this.setData({
        show_login_box: false,
        show_menu: false,
        show_info: ''
      })
      //判断滚动
    },

    onTapToogleMenu: function (event) {
      let temp = !this.show_menu
      this.setData({
        show_menu: temp
      })
    },

    onTapMenu: function (event) {
      const buttonType = event.currentTarget.dataset.type
      console.log(buttonType)
      // 根据不同的按钮类型执行不同的操作
      switch (buttonType) {
        case 'info':
          this.setData({
            show_info: 'info'
          })
          break
        case 'order':
          uni.navigateTo({
            url: '/pages/mine/order'
          })
          break
        case 'logout':
          this.setData({
            show_user: false
          })
          break
        default:
          break
      }
    },

    getPhoneNumber(e) {
      if (!this.agreement) {
        uni.showModal({
          title: '',
          content: '请阅读并勾选隐私协议及用户协议',
          showCancel: false,
          // 不显示取消按钮
          success(res) {}
        })
        return
      }
      if (this.show_user) {
        this.setData({
          show_info: 'goods'
        })
        return
      }
      console.log(e.detail.code) // 动态令牌
      console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
      console.log(e.detail.errno) // 错误码（失败时返回）
      if (!e.detail.code) {
        uni.showModal({
          title: '',
          content: '必须授权手机号才能登陆',
          showCancel: false,
          // 不显示取消按钮
          success(res) {}
        })
        return
      }
      if (!this.wx_open_id) {
        uni.showModal({
          title: '',
          content: '网络异常，请刷新后重试',
          showCancel: false,
          // 不显示取消按钮
          success(res) {}
        })
        return
      }
      uni.showLoading({
        title: '登陆中...',
        mask: true // 是否显示透明蒙层，防止触摸穿透
      })

      Api.request(
        'v1/user/wechatMobileSupplement',
        'POST',
        {
          wx_open_id: this.wx_open_id,
          js_code: e.detail.code
        },
        (data) => {
          console.log(data) // 处理请求成功的逻辑
          uni.hideLoading()
          if (data?.data?.token) {
            // 老用户，登陆
            uni.setStorageSync('token', data.data.token)
            getApp().setGlobalData('token', data.data.token)
            this.setData({
              show_user: true,
              avatar_text: data?.data?.user_info?.avatar_text,
              user_nickname: data?.data?.user_info?.user_nickname,
              mobile: data?.data?.user_info?.mobile,
              regist_time: data?.data?.user_info?.regist_time_text,
              need_mobile: 0
            })
            this.getPackageInfo()
            uni.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            uni.showModal({
              title: '',
              content: '登录失败，请稍后重试(' + data?.msg + ')',
              showCancel: false,
              // 不显示取消按钮
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        function (err) {
          console.error(err) // 处理请求失败的逻辑
        }
      )
    },

    onTapPay: function () {
      var that = this
      uni.showModal({
        title: '',
        content: '暂未开放',
        showCancel: false,
        // 不显示取消按钮
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // _this.setData({
            //   show_info: "",
            // });
          }
        }
      })
    },

    reportLog: function (log) {
      Api.request(
        'v1/log/wxapp',
        'POST',
        {
          log: log
        },
        (data) => {
          console.log('---log---', data) // 处理请求成功的逻辑
        },
        function (err) {
          console.error(err) // 处理请求失败的逻辑
        }
      )
    },

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
          this.setData({
            show_info: 'order'
          })
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
    },

    getPackageInfo: function () {
      Api.request(
        'v1/memberPackage/lists',
        'GET',
        {},
        (data) => {
          console.log(data) // 处理请求成功的逻辑
          uni.hideLoading()
          if (data?.data?.package_list) {
            this.setData({
              packageData: data?.data?.package_list
            })
            // this.setData({
            // show_info: "goods",
            // });
          }
        },
        function (err) {
          console.error(err) // 处理请求失败的逻辑
        }
      )
    },

    goPay: function (event) {
      var that = this
      const price = event.currentTarget.dataset.price
      const uid = event.currentTarget.dataset.uid
      Api.request(
        'v1/memberPackage/createOrder',
        'POST',
        {
          pay_type: 1,
          price: price,
          member_package_uid: uid
        },
        (data) => {
          console.log(data)
          if (data?.data?.payment_detail) {
            uni.requestPayment({
              timeStamp: data?.data?.payment_detail.timeStamp + '',
              nonceStr: data?.data?.payment_detail.nonceStr,
              package: data?.data?.payment_detail.package,
              signType: data?.data?.payment_detail.signType,
              paySign: data?.data?.payment_detail.paySign,
              success: function (res) {
                console.log('支付成功')
                that.getPackageInfo()
                uni.showModal({
                  title: '',
                  content: '支付成功',
                  showCancel: false,
                  // 不显示取消按钮
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.setData({
                        show_pay: false
                      })
                    }
                  }
                })
              },
              fail: function (res) {
                console.log('支付失败', res)
                uni.showModal({
                  title: '',
                  content: '支付失败(' + res?.errMsg + ')',
                  showCancel: false,
                  // 不显示取消按钮
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      that.setData({
                        show_pay: false
                      })
                    }
                  }
                })
              }
            })
          }
        },
        (err) => {
          console.error(err) // 处理请求失败的逻辑
        }
      )
    },

    onTapLogin: function () {
      if (!this.agreement) {
        uni.showModal({
          title: '',
          content: '请阅读并勾选隐私协议及用户协议',
          showCancel: false,
          // 不显示取消按钮
          success(res) {}
        })
        return
      }
      if (this.show_user) {
        this.setData({
          show_info: 'goods'
        })
        return
      } else {
        uni.showLoading({
          title: '登陆中...',
          mask: true // 是否显示透明蒙层，防止触摸穿透
        })

        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            show_user: true
          })
        }, 1000)
      }
    },

    onGetOpenId: function () {
      uni.login({
        success: (res) => {
          console.info('获取登陆code成功', res)
          Api.request(
            'v1/user/wechatLogin',
            'POST',
            {
              js_code: res.code
            },
            (data) => {
              console.log(data) // 处理请求成功的逻辑
              // wx.hideLoading();
              // data.data.need_mobile = 1;
              this.reportLog(
                'wx_open_id: ' + data?.data?.user_info?.wx_open_id + ' need_mobile:' + data?.data?.need_mobile
              )
              this.setData({
                wx_open_id: data?.data?.user_info?.wx_open_id,
                need_mobile: data?.data?.need_mobile
              })
              if (data?.data?.need_mobile == 1) {
                return
              }
              if (data?.data?.token) {
                // 老用户，登陆
                uni.setStorageSync('token', data.data.token)
                getApp().setGlobalData('token', data.data.token)
                this.setData({
                  avatar_text: data?.data?.user_info?.avatar_text,
                  user_nickname: data?.data?.user_info?.user_nickname,
                  mobile: data?.data?.user_info?.mobile,
                  regist_time: data?.data?.user_info?.regist_time_text
                })
                this.getPackageInfo()
              } else {
                uni.showModal({
                  title: '',
                  content: '登录失败，请稍后重试(' + data?.msg + ')',
                  showCancel: false,
                  // 不显示取消按钮
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                })
              }
            },
            function (err) {
              console.error(err) // 处理请求失败的逻辑
            }
          )
        },

        fail: (res) => {
          console.error('获取用户信息失败', res)
        }
      })
    },

    playVideo: function (num = 1) {
      this.videoContext1.stop()
      this.videoContext2.stop()
      this.videoContext3.stop()
      this.videoContext4.stop()
      this.videoContext5.stop()
      this['videoContext' + num].play()
    }
  }
}
</script>
<style>
/* pages/loading/loading.wxss */
.bg {
  width: 100ww;
  height: 100vh;
  opacity: 0.5;
  background-color: #00000080;
}
.content {
  position: absolute;
  top: 10vh;
  padding: 0 43px;
  margin-top: 30px;
  text-align: center;
}
.page2 {
  top: 110vh;
}
.page3 {
  top: 210vh;
}
.page4 {
  top: 310vh;
}
.page5 {
  top: 410vh;
}

.content .title {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: #fff;
}

.content .desc {
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
  color: #fff;
  opacity: 0.8;
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  padding-top: 8px;
}
.login-btn {
  position: fixed;
  bottom: 18%;
  left: 40%;
  height: 6.37vw;
  width: 20vw;
  padding: 0;
}
.myVideo {
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.con {
  width: calc(100vw - 50px);
  position: fixed;
  top: 10vh;
  padding: 0 25px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.con .title {
  display: flex;
  align-items: center;
}

.con .title .img {
  width: 50px;
  height: 50px;
}

.con .title div {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.btns {
  position: fixed;
  bottom: 1vh;
  z-index: 1;
  width: 100%;
}

.btn2 a {
  color: #fff;
  text-decoration: none;
}

.btn {
  width: 80vw !important;
  margin: 0 auto 20px;
  padding: 12px 0;
  text-align: center;
  font-size: 17px;
  border-radius: 8px;
  font-weight: 500;
}

.btn1 {
  background-color: #fff;
}

.btn2 {
  background-color: #0003;
  color: #fff;
  border: solid 2px #fff;
}

.btn3 {
  margin-top: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.btn3 a {
  color: #fff;
  text-decoration: underline;
}
.avatar-box {
  position: relative;
  z-index: 10000;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #696464;
  position: absolute;
  right: 14px;
  top: 42px;
}
.menu-box {
  position: absolute;
  right: 0;
  top: 48px;
  width: 100px;
  padding: 5px;
  text-align: center;
  background: rgba(0, 0, 0, 0.88);
  color: #fff;
}
.menu-item {
  padding: 8px 10px;
  margin-bottom: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  background-color: #ffffff1a;
  border-radius: 50%;
}
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
.title-big {
  margin: 100px auto 20px;
  font-size: 28px;
  font-weight: 300;
  text-align: center;
}
.close-icon {
  position: absolute;
  top: 100px;
  right: 20px;
  width: 24px;
  height: 24px;
}
.goods-close-icon {
  width: 24px;
  height: 24px;
}
.arrow-icon {
  width: 24px;
  height: 24px;
  margin: 0 0 0 50vw;
  transform: translateX(-50%);
}

.wrapper-info .card {
  width: 250px;
  height: 370px;
  border-radius: 8px;
  padding: 25px;
  background-color: #14141480;
  margin: 0 auto;
}

.wrapper-info .card .avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 10px 0 40px;
  position: relative;
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.card .info {
  text-align: left;
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 25px;
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
.wrapper-goods {
  z-index: 1;
  height: 320px;
  color: #fff;
  background-color: #000;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 20px;
}

.wrapper-goods .cards {
  height: 250px;
  overflow: auto;
  padding: 10px 0;
}

.wrapper-goods .card {
  border-radius: 8px;
  padding: 15px 10px 0;
  background-color: #14141480;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper-goods .card .name {
  font-weight: 700;
  font-size: 16px;
}

.wrapper-goods .card .price {
  color: #fe2c55;
  font-size: 16px;
  line-height: 30px;
  text-align: left;
}
.wrapper-goods .card .original_price {
  font-size: 12px;
  text-decoration: line-through;
}
.wrapper-goods .card .btn-buy {
  padding: 5px 7px;
  border-radius: 99px;
  font-size: 14px;
  word-break: keep-all;
  width: 60px;
  text-align: center;
}

.wrapper-goods .card .btn-red {
  background-color: #fe2c55;
}

.wrapper-goods .card .btn-green {
  background-color: #179c66;
}

.wrapper-goods .card .btn-gray {
  background-color: #d9d9d9;
}

.van-overlay.payment[data-v-840318a8] {
  z-index: 5;
  width: 100%;
  height: 100%;
  background: #0000001a !important;
}

.van-overlay.payment .wrapper[data-v-840318a8] {
  color: #fff;
  background-color: #000;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 20px;
}

.van-overlay.payment .wrapper .orderInfo[data-v-840318a8] {
  text-align: left;
  margin: 10px 0 20px;
}

.van-overlay.payment .wrapper .paymentslist[data-v-840318a8] {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.van-overlay.payment .wrapper .paymentslist .name[data-v-840318a8] {
  margin-top: 5px;
}

.paymentslist svg[data-v-840318a8] {
  width: 40px;
  height: 40px;
  object-fit: cover;
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
.login-box {
  width: 100%;
  background-color: #000;
  opacity: 1;
  bottom: 0;
  position: fixed;
  padding: 10vh 0;
  box-sizing: border-box;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.agreement-label {
  color: #fff;
  width: 80vw !important;
  margin: 0 auto;
  padding: 12px 0 12px 2px;
  line-height: 28px;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 500;
  justify-content: left;
  align-items: center;
  text-align: left;
}
.agreement-yellow {
  font-family: PangMenZhengDao;
  font-weight: 700;
  color: #ed8e2f;
  text-shadow: none;
}
.agreement-box {
  width: 28px;
  display: inline-block;
}
</style>
