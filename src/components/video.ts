import { createElm, prefix } from '../utils/dom'

interface VideoOption {
  src: string
  autoplay: boolean
  muted: boolean
}

const DefaultOption: VideoOption = {
  src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  autoplay: false,
  muted: true,
}

export class Video {
  public elm: HTMLVideoElement

  constructor(option: VideoOption = DefaultOption) {
    const mo = { ...DefaultOption, ...option }
    this.elm = createElm('video', prefix('video'))
    this.elm.src = mo.src
    this.elm.controls = false
    this.elm.autoplay = !!mo.autoplay
    this.elm.muted = !!mo.muted
  }
}