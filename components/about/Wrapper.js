import React, { Component } from 'react'
import { binder } from '../../lib/_utils'
import TeamSection from './TeamSection'

class AboutWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isThin: false
    }
    // binder(this, [''])
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

  render () {
    const transformHeaderText = txt => {
      if (txt) {
        return txt.split(' ').map((wd, i) => (
          <div key={i} className={i === txt.split(' ').length - 1 ? 'last' : ''}>
            { wd }
            <style jsx>{`
              div {
                text-transform: uppercase;
                font-family: 'Leafy';
                color: white;
                text-align: center;
              }
              .last {
                font-size: 2em;
              }
            `}</style>
          </div>
        ))
      }
    }
    const team = this.props.data.allTeams || []
    const aboutPage = this.props.data.allAboutPages ? this.props.data.allAboutPages[0] : { description: '' }
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <div className='top-text'>
            <div className='header-text'>{ transformHeaderText(aboutPage.header) || '' }</div>
            <div className='body'>{ aboutPage.description || '' }</div>
          </div>
          <div className='team-wrapper'>
            <div className='header-text'>{ transformHeaderText(aboutPage.teamSectionHeader) || '' }</div>
            <TeamSection isThin={this.state.isThin} team={team} />
          </div>
        </div>
        <style jsx>{`
          .outer-wrapper{
            margin-top: 20vh;
            margin-bottom: 150px;
            position: relative;
            z-index: 4;
          }
          .inner-wrapper{
            padding-top: 20vh;
            position: relative;
          }
          .top-text {
            color: white;
            font-family: 'Leafy';
            display: flex;
            justify-content: center;
            position: relative;
            text-align: center;
          }
          .team-wrapper {
            position: relative;
            margin-top: 10em;
          }
          .header-text {
            position: absolute;
            top: -5em;
            left: 5%;
            transform: rotate(-30deg);
          }
          .body {
            width: 80%;
          }
        `}</style>
      </div>
    )
  }
}

export default AboutWrapper
