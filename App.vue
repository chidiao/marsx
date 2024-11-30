<script>
import audioManager from '@/utils/audioManager'
import { wechatLogin, getUserInfo } from '@/apis/user'

export default {
  data() {
    return {}
  },
  globalData: {
    token: null,
    userInfo: null,
    need_mobile: 0,
    wx_open_id: ''
  },
  methods: {
    setGlobalData(key, value) {
      console.info('setGlobalData', key, value)
      this.globalData[key] = value
    },
    userLogin() {
      uni.login({
        success: (res) => {
          const { code } = res
          this.marsXLogin(code)
        },
        fail: (err) => {
          console.log('--- wx.login 失败 ---')
        }
      })
    },
    async marsXLogin(code) {
      const { data } = await wechatLogin(code)
      this.globalData.need_mobile = data.need_mobile
      this.globalData.token = data.token
      this.globalData.userInfo = data.user_info
      this.globalData.wx_open_id = data.user_info.wx_open_id
    },
    marsXLogout() {
      this.globalData.need_mobile = 0
      this.globalData.token = null
      this.globalData.userInfo = null
    },
    openKefu() {
      uni.openCustomerServiceChat({
        extInfo: {
          url: 'https://work.weixin.qq.com/kfid/kfce2066ab53e9c7c8c'
        },
        corpId: 'wwecca02016493a6cb',
        success(res) {}
      })
    }
  },
  onLaunch() {
    this.audioManager = audioManager
    this.userLogin()
  }
}
</script>

<style>
@import '@/utils/colorui/main.css';
@import '@/utils/colorui/icon.css';

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

view {
  box-sizing: border-box;
}

.cu-btn.block {
  width: 100%;
}
</style>
