import { Icon } from './icon'
import { Progress } from './progress'
import { createDiv, prefix } from '../utils/dom'
import { fmtTime } from '../utils/date'

export class Controls {
  public elm: Element
  public ctx: HTMLVideoElement // 视频元素对象
  public progressCtx: Progress // 进度条对象

  private isPlaying = false // 播放状态
  private playBtn: Element
  private fullBtn: Element
  private timeElm: Element
  private remainderElm: Element
  private showTimer: number = 0

  constructor({ ctx }: { ctx: HTMLVideoElement }) {
    this.elm = createDiv(prefix('controls'))
    this.playBtn = createDiv(prefix('controls__play-btn'))
    this.fullBtn = createDiv(prefix('controls__full-screen-btn'))
    this.timeElm = createDiv(prefix('controls__time'))
    this.remainderElm = createDiv(prefix('controls__remainder'))
    this.ctx = ctx
    this.progressCtx = new Progress({
      onChange: this.onProgressChange,
      onPause: this.onPause,
      onPlay: this.onPlay,
      clearTimer: this.clearTimer,
      onShowControl: this.show,
    })
    this.init()
  }

  init() {
    const playIcon = Icon('play', prefix('controls__play-btn-icon play'))
    const pauseIcon = Icon('pause', prefix('controls__play-btn-icon pause'))
    const fullScreenIcon = Icon('fullScreen', prefix('controls__full-screen-btn-icon full-screen'))
    this.playBtn.appendChild(playIcon)
    this.playBtn.appendChild(pauseIcon)
    this.fullBtn.appendChild(fullScreenIcon)
    this.elm.appendChild(this.playBtn)
    this.elm.appendChild(this.timeElm)
    this.elm.appendChild(this.progressCtx.elm)
    this.elm.appendChild(this.remainderElm)
    this.elm.appendChild(this.fullBtn)
    this.timeElm.appendChild(document.createTextNode('00:00'))
    this.remainderElm.appendChild(document.createTextNode('00:00'))
    this.ctx.addEventListener('pause', this.onPause)
    this.ctx.addEventListener('play', this.onPlay)
    this.ctx.addEventListener('timeupdate', this.onTimeupdate)
    this.ctx.addEventListener('ended', this.onEnded)
    this.ctx.addEventListener('error', this.onError)
    this.ctx.addEventListener('loadedmetadata', this.loadedmetadata)
    this.playBtn.addEventListener('click', this.onClickPlay)
    this.fullBtn.addEventListener('click', this.onClickFullScreen)
  }

  private onPause = () => {
    if (!this.isPlaying) return
    this.isPlaying = false
    this.ctx.pause()
    this.playBtn.classList.remove('is-play')
  }

  private onPlay = () => {
    if (this.isPlaying) return
    this.isPlaying = true
    this.ctx.play()
    this.playBtn.classList.add('is-play')
  }

  private loadedmetadata = () => {
    this.progressCtx.updateConfig({
      end: this.ctx.duration
    })
  }

  private onProgressChange = (val: number) => {
    this.ctx.currentTime = val
  }

  private onClickPlay = () => {
    if (this.isPlaying) {
      this.isPlaying = false
      this.ctx.pause()
      this.playBtn.classList.remove('is-play')
    } else {
      this.isPlaying = true
      this.ctx.play()
      this.playBtn.classList.add('is-play')
    }
  }

  private onClickFullScreen = () => {
    if ('requestFullscreen' in this.ctx) {
      this.ctx.requestFullscreen();
    } else if ('webkitRequestFullscreen' in this.ctx) {
      // @ts-ignore
      this.ctx.webkitRequestFullscreen();
    } else if ('webkitEnterFullscreen' in this.ctx) {
      // @ts-ignore
      this.ctx.webkitEnterFullscreen();
    }
  }

  private onTimeupdate = () => {
    this.timeElm.innerHTML = fmtTime(this.ctx.currentTime)
    this.remainderElm.innerHTML = fmtTime(this.ctx.duration - this.ctx.currentTime)
    this.progressCtx.updateValue(this.ctx.currentTime)
  }

  private onEnded = () => {
    this.progressCtx.reset()
  }

  private onError = (e: Event) => {
    console.error(e)
  }

  public fullscreen() {
    this.onClickFullScreen()
  }

  public show = () => {
    this.clearTimer()
    this.elm.classList.add('show')
    this.showTimer = setTimeout(() => {
      this.elm.classList.remove('show')
    }, 5000)
  }

  public clearTimer = () => {
    clearTimeout(this.showTimer)
  }

  public destroy() {
    this.ctx.removeEventListener('pause', this.onPause)
    this.ctx.removeEventListener('play', this.onPlay)
    this.ctx.removeEventListener('timeupdate', this.onTimeupdate)
    this.ctx.removeEventListener('ended', this.onEnded)
    this.ctx.removeEventListener('error', this.onError)
    this.ctx.removeEventListener('loadedmetadata', this.loadedmetadata)
    this.playBtn.removeEventListener('click', this.onClickPlay)
    this.fullBtn.removeEventListener('click', this.onClickFullScreen)
    this.progressCtx.destroy()
  }
}
