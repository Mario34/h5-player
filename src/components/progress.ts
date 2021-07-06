import { createDiv, prefix } from '../utils/dom'
import { isUndef } from '../utils/type'
import type { ProgressType } from '../type'

const defConfig: ProgressType.Config = {
  start: 0,
  end: 120,
  step: 1,
}

export class Progress {
  public elm: HTMLDivElement
  private activeBar: HTMLDivElement
  private baseBar: HTMLDivElement
  private switch: HTMLDivElement
  private dragPoint: ProgressType.Point = { x: 0, y: 0 }
  private config: ProgressType.Config
  private currentValue: number = 0

  constructor(config?: Partial<ProgressType.Config>) {
    this.config = { ...defConfig, ...config }
    this.elm = createDiv(prefix('progress'))
    this.activeBar = createDiv(prefix('progress__active-bar'))
    this.baseBar = createDiv(prefix('progress__base-bar'))
    this.switch = createDiv(prefix('progress__switch'))
    this.init()
  }

  public updateConfig(config: Partial<ProgressType.Config>) {
    this.config = { ...this.config, ...config }
  }

  public updateValue(value?: number) {
    const { start, end } = this.config
    const elmRect = this.elm.getBoundingClientRect()
    if (!isUndef(value)) {
      this.currentValue = value
    }
    this.moveSwitchX(this.currentValue / ((end - start) / (elmRect.width - this.switch.offsetWidth)))
  }

  public getValue() {
    return this.currentValue
  }

  private init() {
    this.elm.appendChild(this.activeBar)
    this.elm.appendChild(this.baseBar)
    this.elm.appendChild(this.switch)
    this.switch.addEventListener('touchstart', this.onTouchstart)
  }

  private onTouchstart = (e: TouchEvent) => {
    const target = e.target as Element
    const tRect = target.getBoundingClientRect()
    const touch = e.touches[0]
    this.dragPoint = { x: touch.pageX - tRect.left, y: touch.pageY - tRect.top }
    document.addEventListener('touchmove', this.onTouchmove)
    document.addEventListener('touchend', this.onTouchend)
  }

  private onTouchend = () => {
    this.config.onPlay?.()
    this.dragPoint = { x: 0, y: 0 }
    document.removeEventListener('touchmove', this.onTouchmove)
    document.removeEventListener('touchend', this.onTouchend)
    this.updateValue()
  }

  private onTouchmove = (e: TouchEvent) => {
    this.config.onPause?.()
    const touch = e.touches[0]
    const elmRect = this.elm.getBoundingClientRect()
    const left = touch.clientX - elmRect.left - this.dragPoint.x
    const sliderLength = elmRect.width - this.switch.offsetWidth
    const { start, end, step } = this.config
    const range = end - start
    let stepValue = 0
    if (left <= 0) {
      this.moveSwitchX(0)
      stepValue = start
    } else if (left < elmRect.width - this.switch.offsetWidth) {
      stepValue = this.getStepValue(range * left / sliderLength, step)
      this.moveSwitchX(left)
    } else if (left >= elmRect.width - this.switch.offsetWidth) {
      this.moveSwitchX(elmRect.width - this.switch.offsetWidth)
      stepValue = end
    }
    if (this.currentValue !== stepValue) {
      this.config.onChange?.(stepValue)
    }
    this.currentValue = stepValue
    return false
  }

  private moveSwitchX = (x: number) => {
    this.switch.style.left = `${x}px`
    this.activeBar.style.width = `${100 * x / this.elm.offsetWidth}%`
  }

  private onMousedown = () => {

  }

  private onMouseup = () => {

  }

  private onMousemove = () => {

  }

  private getStepValue(value: number, step: number) {
    const d = value % step
    if (d / step >= 0.5) {
      return value - d + step
    }
    return value - d
  }
}
