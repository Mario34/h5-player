type IconType = 'play' | 'pause'

const ICON: { [key in IconType]: string } = {
  play: `<path d="M17.982 9.275L8.06 3.27A2.013 2.013 0 005 4.994v12.011a2.017 2.017 0 003.06 1.725l9.922-6.005a2.017 2.017 0 000-3.45z"></path>`,
  pause: `<path d="M7 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2zM15 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2z"></path>`
}

export const Icon = (icon: IconType, cn?: string) => {
  const elm = document.createElement('div')
  if(cn) {
    elm.className = cn
  }
  elm.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">${ICON[icon]}</svg>`
  return elm
}
