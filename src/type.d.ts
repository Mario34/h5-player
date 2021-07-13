
export namespace HP {
  export namespace ProgressType {
    interface Point {
      x: number
      y: number
    }

    interface Config {
      start: number
      end: number
      step: number
      onChange?: Change
      onPause?: () => void
      onPlay?: () => void
      clearTimer?: () => void
      onShowControl?: () => void
    }

    interface Change {
      (value: number): void
    }
  }

  interface VideoOption {
    src: string
    autoplay?: boolean
    muted?: boolean
    poster?: string
  }
}
