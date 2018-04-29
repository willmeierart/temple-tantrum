// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims } from '../lib/redux/actions'
import Header from './core/Header'
import Footer from './core/Footer'
import FloatyWordCorral from './magic/FloatyWordCorral'
import FloatyWordCanvas from './magic/FloatyWordCanvas'
import Routes from '../server/routes'
import { binder } from '../lib/_utils'

// import globalStyles from '../../styles/index.scss'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        bgColors: [],
        bgImg: ''
      },
      cursor: 0,
      pos: { x: null, y: null }
    }
    binder(this, ['setData'])
    this.cursors = ['Eyeball.png', 'Fire.png', 'Mario.png', 'MiddleFinger.png', 'PointerDude.png', 'RainbowTail.png', 'Strawberry.png']
  }
  componentDidMount () {
    this.setData()
    // console.log(this.props)
    window.addEventListener('mousemove', e => {
      // console.log(e)
      const pos = { x: e.clientX, y: e.clientY }
      // console.log(pos)
      this.setState({ pos })
    })
    window.addEventListener('click', () => {
      const nextIndex = this.state.cursor === this.cursors.length - 1 ? 0 : this.state.cursor + 1
      this.setState({ cursor: nextIndex })
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setData()
    }
  }
  
  setData () {
    const routePhrase = this.props.title.toLowerCase()
    // console.log(routePhrase)
    const data = Routes[routePhrase]
    // console.log(data)
    this.setState({
      // bgImg: routePhrase,
      data
    })
  }

  render () {
    const { children, title } = this.props
    // console.log(title)
    const { data: { bgColors, bgImg }, pos: { x, y } } = this.state
    const cursorRoot = '/static/images/cursors/'
    // console.log(this.cursors, this.state.cursor);
    const CURSOR = this.cursors[this.state.cursor]
    return (
      <div className='app-outer'>
        <div id='CURSOR' />
          <FloatyWordCanvas />
        {/* <FloatyWordCorral> */}
          <div className={title === 'Home' ? 'bg-gradient' : 'bg-img'}>
            <div className={title === 'Home' ? 'bg-img' : 'bg-gradient'}>
              <div className="top-gradient" />
              <header>
                <Header />
              </header>
              <main>{children}</main>
              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        {/* </FloatyWordCorral> */}
        <style jsx global>{`
          a {
            text-decoration: none;
            color: inherit;
          }
          li {
            list-style: none;
          }
          html, body {
            {/* overflow: hidden!important;
            position: fixed!important; */}
          }
          * {
            cursor: none!important;
            background-repeat: no-repeat;
            background-size: contain;
          }
          body {
            box-sizing: border-box;
            margin: 0;
            display: flex;
            justify-content: stretch;
            align-items: stretch;
            font-family: sans-serif;
          }
          header {
            width: 100%;
          }
          footer {}
          main {
            position: absolute;
            top: 0;
            width: 100%;
          }
          .app-outer, .bg-gradient, .bg-img {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            min-width: 100vw;
          }
          .bg-gradient {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, ${bgColors[0]}1), ${bgColors[1]}0.75), ${bgColors[2]}0.5));
            {/* z-index: 2; */}
          }
          .bg-img {
            background: url('${bgImg}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: bottom center;
            width: 100%;
            {/* z-index: 1; */}
          }
          #CURSOR {
            background: url('${cursorRoot}${CURSOR}');
            position: absolute;
            top: ${y - 5}px;
            left: ${x - 3}px;
            width: 50px;
            height: 50px;
            z-index: 10000;
            pointer-events: none;
          }
          .top-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 25vh;
            background: linear-gradient(to bottom, ${bgColors[0]}1), ${bgColors[1]}0));
            z-index: 5;
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App

App.propTypes = {
  title: PropTypes.string.isRequired
}
