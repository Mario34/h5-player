export const prefix = (str: string) => `h5-player-${str}`

export const createDiv = (cln?: string) => {
  return createElm('div', cln)
}

export const createElm = <T extends keyof HTMLElementTagNameMap>(type: T, cln?: string): HTMLElementTagNameMap[T] => {
  const elm = document.createElement(type)
  if (cln) {
    elm.className = cln
  }
  return elm
}