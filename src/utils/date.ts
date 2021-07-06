export const fmtTime = (current: number) => {
  const s = Math.floor(current % 60)
  const m = Math.floor(current / 60)
  const h = Math.floor(current / (3600))
  const res = [doubleStr(s)]
  res.unshift(doubleStr(m))
  if (h > 0) {
    res.unshift(doubleStr(h))
  }
  return res.join(':')
}

const doubleStr = (val: number): string => {
  if (val < 10) {
    return `0${val}`
  }
  return `${val}`
}