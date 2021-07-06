import '../src/style.css'
import '../src/styles/index.scss'
import { InitPlayer } from '../src/index'

const app = document.querySelector<HTMLDivElement>('#app')

InitPlayer({
  selector: '#example-video',
  config: {

  }
})

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M17.982 9.275L8.06 3.27A2.013 2.013 0 005 4.994v12.011a2.017 2.017 0 003.06 1.725l9.922-6.005a2.017 2.017 0 000-3.45z"></path></svg>