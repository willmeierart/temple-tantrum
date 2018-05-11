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
    const team = this.props.data.allTeams || []
    console.log(this.props)
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <TeamSection isThin={this.state.isThin} team={team} />
        </div>
        <style jsx>{`
          .outer-wrapper{
            margin-top: 20vh;
            margin-bottom: 150px;
            position: relative;
            z-index: 4;
          }
          .inner-wrapper{}
        `}</style>
      </div>
    )
  }
}

export default AboutWrapper
