// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import ReactGA from 'react-ga'
import { checkIfMobile, getVPDims, setSponsors, hoverCursor } from '../lib/redux/actions'
import Header from './core/Header'
import Footer from './core/Footer'
import FloatyWordCanvas from './magic/FloatyWordCanvas'
import Routes from '../server/routes'
import Menu from './core/Menu'
import MenuButton from './core/MenuButton'
import { binder } from '../lib/_utils'
import Swoop02 from './swoops/swoop02'
import Swoop04 from './swoops/swoop04'
import withData from '../lib/withData'
import { general } from '../lib/queries'

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
      isThin: false,
      isSafari: false
    }
    binder(this, ['setData', 'updateCursorOnScroll', 'toggleMenu', 'hoverCursor'])
    this.cursors = ['Eyeball.png', 'Fire.png', 'Mario.png', 'PointerDude.png', 'RainbowTail.png', 'Strawberry.png', 'anarchy.png', 'banana.gif', 'dragon.png', 'gauntlet.png', 'lightsaber.gif', 'partyhat.png', 'skull.gif', 'smiley.gif', 'spaceship.gif']
  }
  async componentDidMount () {
    this.setState({ mobileMenu: window.innerWidth < 900 })
    this.setData()
    const checkWindow = () => {
      if (typeof window !== 'undefined') {
        const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
        // console.log(isSafari)
        this.setState({ isSafari })
      } else {
        setTimeout(checkWindow, 500)
      }
    }
    await checkWindow()
    await this.props.onCheckIfMobile()
    if (!this.props.isMobile && !this.state.isSafari) {
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
      const small = window.innerWidth < 1000
      this.setState({ mobileMenu: small, menuOpen: (small && this.state.menuOpen), isThin: small })
    })

    ReactGA.initialize('UA-123772776-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  componentDidUpdate (prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setData()
    }
    // const sponsors = this.props.sponsors
    // if (sponsors !== prevProps.sponsors && sponsors.length > 0) {
    //   this.props.onSetSponsors(sponsors)
    // }
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
    const { children, title, url, isMobile, sponsors, data: { allGenerals, allSponsorses } } = this.props
    // console.log(this.props.data)
    const { data: { bgColors, bgImg }, mousePos: { x, y }, menuOpen, mobileMenu, isThin } = this.state
    const gradient = `linear-gradient(${bgColors[0]}1), ${bgColors[1]}0.75), ${bgColors[2]}0.5))`
    // console.log(allGenerals, allSponsorses)
    // console.log(url);
    const cursorRoot = '/static/images/cursors/'
    const CURSOR = this.cursors[this.state.cursor]
    return (
      <div className='app-outer' onWheel={e => { this.updateCursorOnScroll(e) }}>
        {/* <div id='CURSOR' className={this.props.cursorHovered ? 'active' : ''} /> */}
        { !isMobile && !this.state.isSafari && <div id='CURSOR' className={this.props.cursorHovered ? 'active' : ''} /> }
        <FloatyWordCanvas />
        <div className='swoops'>
          <Swoop04 />
          <Swoop02 />
        </div>
        <div className='app-inner'>
          <div className='bg-gradient' />
          <div className='top-gradient' />
          { mobileMenu && <MenuButton hoverCursor={this.hoverCursor} toggle={this.toggleMenu} menuOpen={menuOpen} /> }
          <header>
            <Header ticketing={{ url: allGenerals ? allGenerals[0].ticketingURL : '', avail: allGenerals ? allGenerals[0].ticketsAvailable : false }} hoverCursor={this.hoverCursor} mobileMenu={mobileMenu} url={url} />
          </header>
          { menuOpen && <Menu hoverCursor={this.hoverCursor} /> }
          { url.pathname !== '/' && <div className='bg-img' /> }
          <main>
            { url.pathname === '/' && <img alt='temple tantrum fest party' className='big-ol-bg' src='/static/images/backgrounds/home_img_lg.png' /> }
            {children}
          </main>
        </div>
        { !menuOpen && <footer>
          <Footer isThin={isThin} hoverCursor={this.hoverCursor} sponsors={allSponsorses} />
        </footer> }
        <style jsx global>{`
          a {
            text-decoration: none;
            color: inherit;
          }
          li {
            list-style: none;
          }
          * {
            cursor: ${!this.state.isSafari && 'none!important'};
            background-repeat: no-repeat;
            background-size: contain;
          }
          body {
            box-sizing: border-box;
            margin: 0;
            display: flex;
            overflow-x: hidden;
            overflow: ${menuOpen ? 'hidden' : 'auto'};
            font-family: sans-serif;
            width: 100vw;
            height: ${menuOpen ? '100vh' : '100%'};
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
            overflow: hidden;
          }
          .app-inner {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            min-width: 100vw;
            min-height: 130vh;
          }
          .swoops {
            position: absolute;
            display: flex;
            justify-content: space-between;
            left: -10vw;
            width: 120vw;
            top: -150px;
            z-index: 10;
          }
          .bg-gradient {
            width: 100vw;
            max-width: 100vw;
            min-height: 100vh;
            background-image: ${gradient};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
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
            background-position: ${url.pathname === '/about' ? 'center bottom' : 'center'};
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
            top: ${y - 10}px;
            left: ${this.state.cursor === this.cursors.indexOf('spaceship.gif') ? x - 20 : this.props.cursorHovered ? x - 16 : x - 10}px;
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
          @media screen and (max-width: 700px) {
            .swoops {
              top: -180px;
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withData(
    graphql(general)(App)
  )
)
// export default App

App.propTypes = {
  title: PropTypes.string.isRequired
}
