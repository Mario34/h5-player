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
  private timeElm: Element

  constructor({ ctx }: { ctx: HTMLVideoElement }) {
    this.elm = createDiv(prefix('controls'))
    this.playBtn = createDiv(prefix('controls__play-btn'))
    this.timeElm = createDiv(prefix('controls__time'))
    this.ctx = ctx
    this.progressCtx = new Progress({
      onChange: this.onProgressChange,
      onPause: this.onPause,
      onPlay: this.onPlay,
    })
    this.init()
  }

  init() {
    const playIcon = Icon('play', prefix('controls__play-btn-icon play'))
    const pauseIcon = Icon('pause', prefix('controls__play-btn-icon pause'))
    this.playBtn.appendChild(playIcon)
    this.playBtn.appendChild(pauseIcon)
    this.elm.appendChild(this.playBtn)
    this.elm.appendChild(this.timeElm)
    this.elm.appendChild(this.progressCtx.elm)
    this.timeElm.appendChild(document.createTextNode('00:00'))
    this.ctx.addEventListener('pause', this.onPause)
    this.ctx.addEventListener('play', this.onPlay)
    this.ctx.addEventListener('timeupdate', this.onTimeupdate)
    this.ctx.addEventListener('ended', this.onEnded)
    this.ctx.addEventListener('error', this.onError)
    this.ctx.addEventListener('loadedmetadata', this.loadedmetadata)
    this.playBtn.addEventListener('click', this.onClickPlay)
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

  public onClickPlay = () => {
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

  public updateState() {

  }

  public onTimeupdate = (e) => {
    this.timeElm.innerHTML = fmtTime(this.ctx.currentTime)
    this.progressCtx.updateValue(this.ctx.currentTime)
  }

  public onEnded = () => {

  }

  public onError = () => {

  }

  public destroy() {

  }
}
