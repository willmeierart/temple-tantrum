import React, { Component } from 'react'
import moment from 'moment'
import Socials from './Socials'
import DateModule from './DateModule'
import HomeTextBox from './HomeTextBox'
import Head from '../Head'
import { hoverCursor } from '../../lib/redux/actions'
import { connect } from 'react-redux'
import { binder } from '../../lib/_utils'

class HomeWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sponsors: []
    }
    binder(this, ['renderTextBoxes'])
  }

  renderTextBoxes () {
    const { data: { allHomeTextBoxes } } = this.props
    // if (data) {
    // const modules = data ? data.allHomeTextBoxes : []
    return allHomeTextBoxes.map((mod, i) => (
      <HomeTextBox hoverCursor={this.props.onHoverCursor} key={i} data={mod} L={i % 2 === 0} />
    ))
    // }
  }

  componentDidMount () {
  }

  render () {
    console.log(this.props)
    const { data: { allGenerals, allHomeTextBoxes } } = this.props
    
    let socials = {}
    if (typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined') {
      const general = allGenerals[0] || {}
      socials.fb = general.facebookLink
      socials.ig = general.instagramLink
      socials.yt = general.youtubeLink
      socials.tw = general.twitterLink
    }
    let date = {}
    if (typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined') {
      const general = allGenerals[0] || {}
      date.start = moment(general.day1Time).format('MMM D')
      date.end = moment(general.day2Time).format('D YYYY')
    }

    const pageDescription = typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined' ? allGenerals[0].homepageDescription : null
    const pageTitle = typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined' ? allGenerals[0].homepageTitle : null

    return (
      <div>
        <Head description={pageDescription || "The Temple Tantrum is a gritty boutique music and experiential arts festival set in Denver Colorado, September 1st and 2nd, Labor Day weekend, 2018"} title={pageTitle || 'Temple Tantrum - Home'} />
        <section>
          <div className='socials-wrapper'>
            <Socials socials={socials} hoverCursor={this.props.onHoverCursor} />
          </div>
          <div className='date-wrapper'>
            <DateModule date={date} />
          </div>
          <div className='text-block-wrapper'>{allHomeTextBoxes && this.renderTextBoxes()}</div>
        </section>
        <style jsx>{`
          section {
            position: relative;
            height: 100%;
            width: 100vw;
          }
          .img-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
          img {
            width: 50%;
            height: 50%;
          }
          .socials-wrapper {
            position: absolute; 
            top: -100vh;
            right: 10vw;
            color: white;
          }
          .date-wrapper {
            position: absolute;
            width: 150px;
            left: 10vw;
            top: -100vh;
          }
          .text-block-wrapper {
            margin-top: 100vh;
            z-index: 10;
            margin-bottom: 40vw;
          }
          @media screen and (max-width: 1200px) {
            .socials-wrapper, .date-wrapper {
              top: -70vh;
              right: 5vw;
            }
          }
          @media screen and (min-width: 1200px) and (max-width: 1350px) {
            .socials-wrapper, .date-wrapper {
              top: -90vh;
            }
          }
          @media screen and (min-width: 1500px) {
            .socials-wrapper, .date-wrapper {
              top: -120vh;
            }
          }
        `}</style>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    onHoverCursor: bool => dispatch(hoverCursor(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper)
