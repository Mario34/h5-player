import '../src/style.css'
import '../src/styles/index.scss'
import { InitPlayer } from '../src/index'

InitPlayer({
  selector: '#example-video',
  config: {
    src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    muted: true,
    poster: 'https://oss-fg.feng-go.com/static/pic/2020/feng-go-uniapp/EvanYou.jpeg'
  }
})
