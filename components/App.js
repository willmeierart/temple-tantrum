// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkIfMobile, getVPDims } from '../lib/redux/actions'
import Header from './core/Header'
import Footer from './core/Footer'
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
      }
    }
    binder(this, ['setData'])
  }
  componentDidMount () {
    this.setData()
    console.log(this.props)
  }

  componentDidUpdate (prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setData()
    }
  }
  
  setData () {
    const routePhrase = this.props.title.toLowerCase()
    console.log(routePhrase)
    const data = Routes[routePhrase]
    console.log(data)
    this.setState({
      // bgImg: routePhrase,
      data
    })
  }

  render () {
    const { children } = this.props
    const { data: { bgColors, bgImg } } = this.state
    const colorFromTitle = this.props.title.toLowerCase()
    return (
      <div className='app-outer'>
        <div className='bg-gradient'>
          <div className='bg-img'>
            <header>
              <Header />
            </header>
            <main>{ children }</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </div>
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
          body {
            box-sizing: border-box;
            margin: 0;
            display: flex;
            justify-content: stretch;
            align-items: stretch;
            font-family: sans-serif;
          }
          header {}
          footer {}
          main {}
          .app-outer, .bg-gradient, .bg-img {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            min-width: 100vw;
          }
          .bg-gradient {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, ${bgColors[0]}1), ${bgColors[1]}0.5), ${bgColors[2]}0));
            {/* z-index: 2; */}
          }
          .bg-img {
            background: url('${bgImg}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: bottom center;
            {/* z-index: 1; */}
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
