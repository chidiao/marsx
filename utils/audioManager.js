class AudioManager {
  constructor() {
    // // 登陆音乐
    // this.bgAudioCtx1 = wx.createInnerAudioContext();
    // this.bgAudioCtx1.src = 'https://static.itopline.com/miniapp/v1/static/audio/login.mp3?v=' + Date.now().toString();
    // // 中心音乐
    // this.bgAudioCtx2 = wx.createInnerAudioContext();
    // this.bgAudioCtx2.src = 'https://static.itopline.com/miniapp/v1/static/audio/home.mp3?v=' + Date.now().toString();
    // // 按钮音乐
    // this.buttonAudioCtx = wx.createInnerAudioContext();
    // this.buttonAudioCtx.src = 'https://static.itopline.com/miniapp/v1/static/audio/click.mp3?v=' + Date.now().toString();
    // // 监听音频播放错误事件
    // this.bgAudioCtx1.onError((res) => {
    //   console.error('按钮音效1播放错误', res.errMsg, res.errCode);
    // });
    // this.bgAudioCtx2.onError((res) => {
    //   console.error('按钮音效2播放错误', res.errMsg, res.errCode);
    // });
    // this.buttonAudioCtx.onError((res) => {
    //   console.error('按钮音效3播放错误', res.errMsg, res.errCode);
    // });
  }
  playButtonSound() {
    // 每次播放按钮声音时重新加载音频，确保每次点击都能播放
    this.buttonAudioCtx.stop(); // 停止之前的音效播放
    this.buttonAudioCtx.seek(0); // 重置音效播放进度
    this.buttonAudioCtx.play();
  }
  playBgSound1() {
    this.stopBgSound2(); // 播放按钮音效1时，停止按钮音效2
    this.bgAudioCtx1.stop(); // 停止之前的音效播放
    this.bgAudioCtx1.seek(0); // 重置音效播放进度
    this.bgAudioCtx1.play();
  }
  playBgSound2() {
    this.stopBgSound1(); // 播放按钮音效2时，停止按钮音效1
    this.bgAudioCtx2.stop(); // 停止之前的音效播放
    this.bgAudioCtx2.seek(0); // 重置音效播放进度
    this.bgAudioCtx2.play();
  }
  stopButtonSound() {
    this.buttonAudioCtx.stop();
  }
  stopBgSound1() {
    this.bgAudioCtx1.stop();
  }
  stopBgSound2() {
    this.bgAudioCtx2.stop();
  }
}
const audioManager = new AudioManager();
export default audioManager;