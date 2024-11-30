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
    wx_open_id: '',

    setGlobalData: function (key, value) {
      console.info('setGlobalData', key, value)
      this[key] = value
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
      this.need_mobile = data.need_mobile
      this.token = data.token
      this.userInfo = data.user_info
      this.wx_open_id = data.user_info.wx_open_id
    },

    marsXLogout() {
      this.need_mobile = 0
      this.token = null
      this.userInfo = null
    },

    utils: {
      formatDate: function (timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        const formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        return formattedTime
      }
    },

    key: ''
  },
  onLaunch() {
    this.audioManager = audioManager
    this.globalData.userLogin()
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
