import { Video } from './components/video'
import { Controls } from './components/controls'

type Selector = string | Element

interface Config {
  autoPlay: boolean
}

interface InitOption {
  /**
   * 选择器
  */
  selector: Selector
  /**
   * 配置
  */
  config?: Partial<Config>
}

const DefaultConfig: Config = {
  autoPlay: false,
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
  const video = new Video()
  const controls = new Controls({ ctx: video.elm })

  rootElm.appendChild(video.elm)
  rootElm.appendChild(controls.elm)
}
