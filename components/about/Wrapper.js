import React, { Component } from 'react'
import { binder } from '../../lib/_utils'
import TeamSection from './TeamSection'

class AboutWrapper extends Component {
  constructor (props) {
    super(props)
    // binder(this, [''])
  }

  componentDidMount () {}

  render () {
    const team = this.props.data.allTeams || []
    console.log(this.props)
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <TeamSection team={team} />
        </div>
        <style jsx>{`
          .outer-wrapper{}
          .inner-wrapper{}
        `}</style>
      </div>
    )
  }
}

export default AboutWrapper
