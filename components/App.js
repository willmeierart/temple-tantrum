// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims, setSponsors, hoverCursor } from '../lib/redux/actions'
import Header from './core/Header'
import Footer from './core/Footer'
import FloatyWordCanvas from './magic/FloatyWordCanvas'
import Routes from '../server/routes'
import Menu from './core/Menu'
import MenuButton from './core/MenuButton'
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
      mousePos: { x: 0, y: 0 },
      mobileMenu: false,
      menuOpen: false,
      cursorHover: false,
      isThin: false
    }
    binder(this, ['setData', 'updateCursorOnScroll', 'toggleMenu', 'hoverCursor'])
    this.cursors = ['Eyeball.png', 'Fire.png', 'Mario.png', 'PointerDude.png', 'RainbowTail.png', 'Strawberry.png', 'anarchy.png', 'banana.gif', 'dragon.png', 'gauntlet.png', 'lightsaber.gif', 'partyhat.png', 'skull.gif', 'smiley.gif', 'spaceship.gif']
  }
  componentDidMount () {
    this.setState({ mobileMenu: window.innerWidth < 900 })
    this.setData()
    if (!this.props.isMobile) {
      window.addEventListener('mousemove', e => {
        const { scrollX, scrollY } = window
        const mousePos = { x: e.clientX + scrollX, y: e.clientY + scrollY }
        this.setState({ mousePos })
      })
      window.addEventListener('click', () => {
        const nextIndex = this.state.cursor === this.cursors.length - 1 ? 0 : this.state.cursor + 1
        this.setState({ cursor: nextIndex })
      })
    }
    // window.addEventListener('scroll', e => { e.preventDefault() })
    window.addEventListener('resize', () => {
      const small = window.innerWidth < 900
      this.setState({ mobileMenu: small, menuOpen: (small && this.state.menuOpen), isThin: small })
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setData()
    }
  }

  toggleMenu () {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  hoverCursor (bool) {
    this.props.onHoverCursor(bool)
  }

  updateCursorOnScroll (e) {
    const { mousePos } = this.state
    const { scrollY, innerHeight } = window
    const { deltaY } = e
    let D = { ...mousePos }
    if (!scrollY <= 0 && !mousePos.y >= innerHeight) { D.y = mousePos.y + deltaY }
    const newMousePos = { x: D.x, y: D.y }
    this.setState({ mousePos: newMousePos })
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
    const { children, title, url, isMobile } = this.props
    // console.log(url);
    const { data: { bgColors, bgImg }, mousePos: { x, y } } = this.state
    const cursorRoot = '/static/images/cursors/'
    const CURSOR = this.cursors[this.state.cursor]
    return (
      <div className='app-outer' onWheel={e => { this.updateCursorOnScroll(e) }}>
        { !isMobile && <div id='CURSOR' className={this.props.cursorHovered ? 'active' : ''} /> }
        <FloatyWordCanvas />
        <div className='app-inner'>
          <div className='bg-gradient' />
          <div className='top-gradient' />
          { this.state.mobileMenu && <MenuButton hoverCursor={this.hoverCursor} toggle={this.toggleMenu} menuOpen={this.state.menuOpen} /> }
          <header>
            <Header hoverCursor={this.hoverCursor} mobileMenu={this.state.mobileMenu} url={url} />
          </header>
          { this.state.menuOpen && <Menu hoverCursor={this.hoverCursor} /> }
          { url.pathname !== '/' && <div className='bg-img' /> }
          <main>
            { url.pathname === '/' && <img className='big-ol-bg' src='/static/images/backgrounds/home_img_lg.png' /> }
            {children}
          </main>
        </div>
        <footer>
          <Footer isThin={this.state.isThin} hoverCursor={this.hoverCursor} sponsors={this.props.sponsors} />
        </footer>
        <style jsx global>{`
          a {
            text-decoration: none;
            color: inherit;
          }
          li {
            list-style: none;
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
            width: 100vw;
            height: 100%;
            position: relative;
          }
          header {
            width: 100%;
          }
          footer {
            position: absolute;
            bottom: 0;
            height: 100px;
            width: 100%;
            z-index: 1200;
          }
          main {
            {/* position: ${ url.pathname === '/' ? 'absolute' : 'regular' }; */}
            z-index: 4;
            top: 0;
            height: 100%;
            width: 100%;
          }
          .app-outer {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            min-width: 100vw;
            box-sizing: border-box;
          }
          .app-inner {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            min-width: 100vw;
            min-height: 100vh;
          }
          .bg-gradient {
            width: 100vw;
            min-height: 100vh;
            background: linear-gradient(to bottom, ${bgColors[0]}1), ${bgColors[1]}0.75), ${bgColors[2]}0.5));
            position: fixed;
            top: 0;
            left: 0;
            z-index: ${title === 'Home' ? 2 : 3};
          }
          .bg-img {
            height: 100vh;
            width: 100vw;
            position: fixed;
            display: flex;
            top: 0;
            left: 0;         
            background: url('${bgImg}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: ${url.pathname === '/' ? 'center bottom' : 'center'};
            z-index: ${title === 'Home' ? 3 : 2};
          }
          .big-ol-bg {
            width: 100%;
            z-index: 4;
            margin-top: 15vh;
            margin-bottom: -100vh;
          }
          #CURSOR {
            background: url('${cursorRoot}${CURSOR}');
            position: absolute;
            top: ${y - 5}px;
            left: ${x - 3}px;
            width: 50px;
            height: 50px;
            z-index: 1000000000000000000000000000000000000000000000000;
            pointer-events: none;
          }
          #CURSOR.active {
            background: url('/static/images/cursors/MiddleFinger.png');
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
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile,
    dims: state.env.dims,
    cursorHovered: state.env.cursorHovered,
    sponsors: state.cachedData.sponsors
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCheckIfMobile: () => dispatch(checkIfMobile()),
    onGetVPDims: () => dispatch(getVPDims()),
    onSetSponsors: sponsors => dispatch(setSponsors(sponsors)),
    onHoverCursor: bool => dispatch(hoverCursor(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App

App.propTypes = {
  title: PropTypes.string.isRequired
}
