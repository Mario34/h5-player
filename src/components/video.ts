import { createElm, prefix } from '../utils/dom'
import type { HP } from '../type'

const DefaultOption: HP.VideoOption = {
  src: '',
  autoplay: false,
  muted: false,
}

export class Video {
  public elm: HTMLVideoElement

  constructor(option?: HP.VideoOption) {
    const mo = { ...DefaultOption, ...(option || {}) }
    this.elm = createElm('video', prefix('video'))
    this.elm.src = mo.src
    this.elm.controls = false
    if (mo.poster) {
      this.elm.poster = mo.poster
    }
    this.elm.autoplay = !!mo.autoplay
    this.elm.muted = !!mo.muted
    this.elm.playsInline = true // 禁止默认的全屏
  }
}
