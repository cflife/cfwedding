// components/love/music/index.js
import { loveBehavior } from '../love-beh'
let mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    waittingUrl: 'images/player@waitting.png',
    playingUrl: 'images/player@playing.png'
  },

  attached: function () {
    this._recoverPlaying()
    this._monitorSwitch()
  },

  detached: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        if (mMgr.src == this.properties.src) {
          mMgr.play()
        } else {
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },

    _recoverPlaying: function () {
      if (mMgr.pause) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        if (!mMgr.pause) {
          this.setData({
            playing: true
          })
        }
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      }),
        mMgr.onEnded(() => {
          this._recoverPlaying()
        })
    }
  }
})
