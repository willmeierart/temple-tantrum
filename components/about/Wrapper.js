import React, { Component } from 'react'
import Head from '../Head'
import { binder } from '../../lib/_utils'

class AboutWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isThin: false
    }
    binder(this, ['renderTextModules'])
  }

  componentDidMount () {
    const initWindow = () => {
      if (typeof window !== 'undefined') {
        this.setState({ isThin: window.innerWidth < 500 })
        window.addEventListener('resize', () => {
          this.setState({ isThin: window.innerWidth < 500 })
        })
      } else {
        setTimeout(() => {
          initWindow()
        }, 200)
      }
    }
    initWindow()
  }

  renderTextModules () {
    const aboutPage = this.props.data.allAboutPages ? this.props.data.allAboutPages : []
    // console.log('renderTM', aboutPage)
    return aboutPage.map(sec => {
      const { header, description } = sec
      return (
        <div key={sec.header} className='wrapper'>
          <div className='header-text'>{ header }</div>
          <div className='body-text'>{ description }</div>
          <style jsx>{`
            .wrapper {
              font-family: 'Verlag-Black';
              width: 80%;
              margin: auto;
              color: white;
              margin-bottom: 3em;
              white-space: pre-line;
            }
            .header-text {
              font-size: 3em;
              margin-bottom: .5em;
            }
            .body-text {
              font-size: 1.5em;
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    console.log(this.props.data)
    const aboutPage = this.props.data.allAboutPages ? this.props.data.allAboutPages : []
    const headContent = this.props.data.allGenerals ? this.props.data.allGenerals[0] : { aboutPageTitle: null, aboutPageDescription: null }
    const { aboutPageTitle, aboutPageDescription } = headContent
    return (
      <div className='outer-wrapper'>
        <Head
          description={aboutPageDescription || "Temple Tantrum Festival takes place on Labor Day weekend, Sept 1-2 in Denver’s Rino District, to celebrate the weirder side of Denver."}
          title={aboutPageTitle || 'Temple Tantrum - About'} /> 
        { this.props.data.allAboutPages && <div className='inner-wrapper'>{ this.renderTextModules() }</div> }
        <style jsx>{`
          .outer-wrapper{
            margin-top: 20vh;
            margin-bottom: 150px;
            z-index: 4;
          }
          .inner-wrapper{
            padding-top: 20vh;
          }
        `}</style>
      </div>
    )
  }
}

export default AboutWrapper
