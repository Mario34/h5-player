import { Video } from './components/video'
import { Controls } from './components/controls'
import type { HP } from './type'

type Selector = string | Element

interface Config extends HP.VideoOption {
  fullscreen?: boolean
}

interface InitOption {
  /**
   * 选择器
  */
  selector: Selector
  /**
   * 配置
  */
  config: Config
}

export function InitPlayer(option: InitOption) {
  let rootElm = option.selector
  if (!rootElm) {
    console.error('The option [selector] must to required.')
    return
  }
  if (typeof rootElm === 'string') {
    const elm = document.querySelector(rootElm)
    if (elm == null) {
      console.error('The option [selector] is invalid.')
      return
    }
    rootElm = elm
  }
  rootElm.classList.add('h5-player-root')
  const video = new Video(option.config)
  const controls = new Controls({ ctx: video.elm })

  rootElm.appendChild(video.elm)
  rootElm.appendChild(controls.elm)

  return {
    destroy() {
      controls.destroy()
    },
    updateConfig(config: Config) {
      if('src' in config) {
        video.elm.src = config.src
      }
      if('autoplay' in config) {
        video.elm.autoplay = !!config.autoplay
      }
      if('fullscreen' in config) {
        controls.fullscreen()
      }
      if('muted' in config) {
        video.elm.muted = !!config.muted
      }
    }
  }
}
