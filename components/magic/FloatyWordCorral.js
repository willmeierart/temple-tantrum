import React, { Component } from 'react'
import { Motion, spring, presets } from 'react-motion'
import { binder } from '../../lib/_utils'
import floatyWordState from './floatyWordState'


// notes:
// each word probably needs its own state obj
// so manager func is gonna have to spread all that
// each axis needs its own state per obj
// z axis needs to be treated differently than others
// use transitionmotion to control css, using only numerical properties in state
// use getboundingclientrect on each word in state to check bounds
// flip direction +/- if word bounds === opposite bounds of corral
// dont update state on interval update state on init and on direction change 
// and only update axis that needs to be steered away from
// they all can probably move at the same speed ?
// ^^ its just what axis ?



export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      corralBounds: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      words: floatyWordState,
      turnedOn: false
    }
    binder(this, ['setAllOrigins', 'setWordOrigin', 'evaluateWordBounds', 'setAllDirState', 'turnOnTheMachine', 'renderAllFloatyWords', 'recalcWordPositions'])
    const inc = 200
    this.randomLefts = [
      Math.ceil(Math.random() * inc) / 5,
      Math.ceil(Math.random() * inc) / 8,
      Math.ceil(Math.random() * inc) / 3,
      Math.ceil(Math.random() * inc) / 4,
      Math.ceil(Math.random() * inc) / 2
    ]
    this.randomTops = [
      Math.ceil(Math.random() * inc) / 2,
      Math.ceil(Math.random() * inc) / 7,
      Math.ceil(Math.random() * inc) / 4,
      Math.ceil(Math.random() * inc) / 7,
      Math.ceil(Math.random() * inc) / 8
    ]
  }

  async componentDidMount () {
    const setCorralBounds = () => {
      const corralBounds = this.corral.getBoundingClientRect()
      this.setState({ corralBounds })
    }
    
    await setCorralBounds()
    await this.setAllOrigins()

    window.addEventListener('resize', setCorralBounds)

    // setTimeout(() => {
    //   this.greenLight = window.requestAnimationFrame(this.turnOnTheMachine)
    // }, 500)
    // this.interval = setInterval(() => {
    this.turnOnTheMachine()
    // }, 3000)
  }

  componentWillUnmount () {
    // window.cancelAnimationFrame(this.greenLight)
    // clearInterval(this.interval)
  }

  setAllOrigins () {
    const { words, corralBounds } = this.state
    console.log(corralBounds)
    Object.keys(words).forEach(wd => {
      this.setWordOrigin(words[wd])
    })
  }

  setWordOrigin (wd) {
    const {
      corralBounds: { bottom, right },
      words
    } = this.state
    const { origin } = wd
    const x = Math.floor(Math.random() * right)
    const y = Math.floor(Math.random() * bottom)
        
    const wdName = Object.keys({ wd })

    console.log(right, x, bottom, y)
    
    this.setState({
      words:
      {
        ...words,
        [wdName]: {
          ...wd,
          origin:
          { ...origin, x, y }
        }
      }
    }, () => { console.log(this.state.words); })
  }

  async turnOnTheMachine () {
    // await this.setAllDirState()
    // setInterval(() => {
      // console.log('machine');
      // this.setAllDirState()
    await this.recalcWordPositions()
    // }, 16) 
  }

  async recalcWordPositions () {
    const { words, corralBounds: { right, bottom } } = this.state
    const newWords = { ...words }
    await Object.keys(words).forEach(wd => {
      const word = words[wd]
      // console.log(word)
      const { bounds, dir } = word
      const newDir = { ...dir }
      // console.log(bounds)
      const rect = this[wd].getBoundingClientRect()
      console.log(bounds, right, bottom)
      // console.log(rect)
      if (bounds.left <= 0 || bounds.right >= right) {
        newDir.x *= -1
      }
      if (bounds.top <= 0 || bounds.bottom >= bottom) {
        newDir.y *= -1
      }
      // const { top, left, bottom, right } = rect
      console.log(newDir, dir, bounds)
      newWords[wd] = {
        ...word,
        bounds: {
          ...bounds,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        },
        dir: {
          ...dir,
          x: newDir.x,
          y: newDir.y
        }
      }

      // }, function () { this.evaluateWordBounds(word) })
    })
    this.setState({
      words: newWords
    })
  }

  setAllDirState () {
    const { words } = this.state
    Object.keys(words).forEach(wd => {
      this.evaluateWordBounds(words[wd])
    })
  }

  evaluateWordBounds (wd) {
    const wdName = Object.keys({ wd })
    const { corralBounds: { right, left, top, bottom }, words: { [wdName]: { dir, bounds } } } = this.state
    const newDir = { ...dir }
    console.log(bounds, left, right)
    if (bounds.left <= 0 || bounds.right >= right) {
      newDir.x *= -1
    }
    if (bounds.top <= 0 || bounds.bottom >= bottom) {
      newDir.y *= -1
    }
    if (newDir.x !== dir.x || newDir.y !== dir.y) {
      
      this.setState({
        words: {
          ...this.state.words,
          [wdName]: {
            ...wd,
            dir: {
              ...dir,
              x: newDir.x,
              y: newDir.y
            }
          }
        }
      })
    }
  }

  renderAllFloatyWords () {
    setTimeout(() => {
      this.setState({ turnedOn: true })
    }, 500)
    const that = this
    const amt = .25
    const { words, corralBounds, turnedOn } = this.state
    return Object.keys(words).map(wd => {
      const word = words[wd]
      const name = word.name || wd
      const { dir, origin, bounds: { top, left } } = word
      const styles = {
        boxSizing: 'border-box',
        willChange: 'transform',
        pointerEvents: 'none',
        position: 'absolute',
        top: origin.x,
        left: origin.y
        // top,
        // left
      }
      const newLeft = this[wd] ? this[wd].getBoundingClientRect().left : 0
      const newTop = this[wd] ? this[wd].getBoundingClientRect().top : 0
      // const randLeft = Math.ceil(this.randomLefts[Math.floor(Math.random() * this.randomLefts.length)] + newLeft)
      // const randTop = Math.ceil(this.randomTops[Math.floor(Math.random() * this.randomTops.length)] + newTop)
      const randLeft = Math.ceil(Math.random() * 10)
      const randTop = Math.ceil(Math.random() * 10)

      console.log(randLeft, randTop)
      // this.

      return (
        <Motion
          key={wd}
          style={{
            x: spring(amt * dir.x),
            y: spring(amt * dir.y)
          }}>
          {({ x, y }) => {
            const transX = randLeft /* * corralBounds.left / 10 */ + x + 'px'
            const transY = randTop /* * corralBounds.top / 10 */ + y + 'px'
            console.log(x, y)
            {/* turnedOn && that.turnOnTheMachine() */}
            {/* console.log(transX, transY)             */}
            return (
              <div ref={w => { this[wd] = w }} className='floaty-word' style={{
                ...styles,
                transform: `translate3d(${transX}, ${transY}, 0)`
              }}>
                { name.toUpperCase() }
              </div>
            )
          }}
        </Motion>
      )
    })
  }

  render () {
    return (
      <div ref={c => this.corral = c} className='word-corral'>
        { this.renderAllFloatyWords() }
        { this.props.children }
        <style jsx>{`
          .word-corral {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            z-index: 10;
            overflow: hidden;
          }
            {
            /* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */
          }
        `}</style>
      </div>
    )
  }
}

// example of GraphQL with multiple queries composed:
// export default withData(
//   compose(
//     graphql(allThings1, { name: 'allThings1' }),
//     graphql(allThings2, { name: 'allThings2' })
//   )(HomePage)
// )
