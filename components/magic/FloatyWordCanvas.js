import React, { Component } from 'react'
import PropTypes from 'prop-types'
import random from 'unique-random'
import floatyWordState from './floatyWordState'
import { binder } from '../../lib/_utils'

class FloatyWordCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      w: 0,
      h: 0,
      x: 100,
      y: 200,
      dx: 1,
      dy: 1,
      words: floatyWordState,
      canvasInitd: false,
      height: 0
    }
    binder(this, ['initCanvas', 'updateCanvasSize', 'renderWord', 'setAllOrigins', 'animateAllWords'])
    this.wordNames = Object.keys(floatyWordState)
    this.three = true
  }

  async componentDidMount () {
    await this.updateCanvasSize()
    await this.setAllOrigins()
    this.initCanvas()
    window.addEventListener('resize', () => {
      this.updateCanvasSize()
    })
    const initHeight = () => {
      this.body = document.querySelector('body')
      const height = Math.max(this.body.scrollHeight, this.body.offsetHeight, window.outerHeight)
      this.setState({ height })
    }
    let interval
    if (typeof document !== 'undefined') {
      await initHeight()
      if (!interval) {
        interval = setInterval(() => {
          if (this.state.height !== Math.max(this.body.scrollHeight, this.body.offsetHeight, window.outerHeight) - 4) {
            this.setState({ height: Math.max(this.body.scrollHeight, this.body.offsetHeight, window.outerHeight) - 4 }, this.updateCanvasSize)
            // this.updateCanvasSize()
          } else {
            clearInterval(interval)
          }
        }, 1000)
      }
    } else {
      setTimeout(initHeight, 200)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.updateCanvasSize()
    }
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.animateAllWords)
  }

  updateCanvasSize () {
    // console.log(this.body.scrollHeight, this.body.offsetHeight, window.outerHeight)
    let height
    if (this.body) {
      height = this.state.height
    } else {
      height = window.outerHeight
    }
    this.setState({ w: window.innerWidth, h: height })
  }

  setAllOrigins () {
    const { words, w, h } = this.state
    const newWordState = { ...words }
    const margin = 100
    this.wordNames.forEach(wd => {
      const word = { ...words[wd] }
      const { pos } = { ...word }
      const randX = random(margin, w - margin)
      const randY = random(margin, h - margin)
      const S = word.size || 1
      const randSize = random(Math.floor(window.innerWidth / 25 * S), Math.floor(window.innerWidth / 15 * S))
      pos.x = randX()
      pos.y = randY()
      newWordState[wd] = {
        ...word,
        pos,
        size: randSize()
      }
    })
    this.setState({ words: newWordState })
  }

  initCanvas () {
    const ctx = this.canvas.getContext('2d')
    const { w, h } = this.state
    ctx.fillStyles = 'black'
    ctx.fillRect(0, 0, w, h)
    window.requestAnimationFrame(() => { this.animateAllWords(ctx) })
  }

  animateAllWords (ctx) {
    const { words, w, h } = this.state
    const newWordState = { ...words }
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#ffffff'
    this.wordNames.forEach(wd => { newWordState[wd] = this.renderWord(ctx, wd) })
    this.setState({ words: newWordState }, () => {
      setTimeout(() => { this.animateAllWords(ctx) })
    })
  }

  renderWord (ctx, wd) {
    const { words, w, h } = this.state
    const word = words[wd]
    const { dir, pos: { x, y }, name } = word
    const conds = { negX: x < 0 || x > w, negY: y < 0 || y > h }
    const condDX = conds.negX ? -dir.x : dir.x
    const condDY = conds.negY ? -dir.y : dir.y
    const newWord = {
      ...word,
      pos: {
        x: x + condDX,
        y: y + condDY
      },
      dir: {
        x: condDX,
        y: condDY
      }
    }
    ctx.font = `${word.size}px Leafy`
    ctx.fillText(name, x, y)
    return newWord
  }

  render () {
    const { w, h } = this.state
    return (
      <div className='canvas-wrapper'>
        <canvas id='canvas' width={w} height={h} ref={canvas => { this.canvas = canvas }} />
        <style jsx>{`
          .canvas-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            mix-blend-mode: overlay;
            pointer-events: none;
            opacity: 0.5;
          }
        `}</style>
      </div>
    )
  }
}

FloatyWordCanvas.propTypes = {}

export default FloatyWordCanvas
