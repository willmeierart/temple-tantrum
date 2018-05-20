import React, { Component } from 'react'
import moment from 'moment'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import { graphql } from 'react-apollo'
import { livePage } from '../lib/queries'
import withData from '../lib/withData'

class LivePage extends Component {
  componentDidMount () {
  }
  render () {
    const { data: { allLivePages, allGenerals } } = this.props
    // const stuff = allLivePages ? allLivePages[0] : {}
    // console.log(stuff)
    const conds = typeof allLivePages !== 'undefined'
    let date = {}
    if (typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined') {
      const general = allGenerals[0] || {}
      date.start = moment(general.day1Time).format('MMM Do')
      date.end = moment(general.day2Time).format('MMM Do')
    }
    
    return (
      <AppProvider {...this.props} title='Live'>
        <Head title='Live' />
        { conds && <section>
          {/* <div className='page-title'>Live</div> */}
          {/* <div className='the-music'>THE MUSIC</div> */}
          <div className='dates'>
            <h3>{date.start}</h3>
            <h3>{date.end}</h3>
          </div>
          <div className='lineups'>
            <div className='content'>
              <h2>MUSIC</h2>
              <div className='music-lineup lineup-img' />
            </div>
            <div className='content'>
              <h2 className='notfirst'>ARTISTS</h2>
              <div className='artist-lineup lineup-img' />
            </div>
            <div className='content'>
              <h2 className='notfirst'>ENTERTAINMENT</h2>
              <div className='entertainment-lineup lineup-img' />
            </div>
          </div>
        </section> }
        <style jsx>{`
          section {
            width: 80%;
            position: relative;
            margin-left: 10%;
            margin-top: 30vh;
            margin-bottom: 150px;
            flex-grow: 1;
            height: 100%;
            font-family: Leafy;
            color: white;        
            letter-spacing: .125em;
            z-index: 4;
          }
          .the-music {
            font-size: 1.75em;
            position: absolute;
            top: 5vh;
            left: 5vw;
            transform: rotate(-20deg);

          }
          .dates {
            display: flex;
            justify-content: space-around;
            width: 80%;
            {/* height: 150px; */}
            margin-left: 10%;
          }
          .lineups {
            display: flex;
            flex-direction: column;
            {/* justify-content: space-around; */}
            align-items: center;
            flex-grow: 1;
            height: 100%;
            
          }
          .content {
            {/* display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            flex-grow: 1; */}
            text-align: center;
            height: 100%;
            {/* border: 1px solid darkred; */}
            
          }
          h3 {
            font-size: 3em;
            {/* line-height: .25em; */}
            color: black;
          }
          h2 {
            font-size: 3em;
            width: 60vw;
          }
          h2.notfirst {
            margin-top: 100px;
          }
          .lineup-img {
            width: 100%;
            height: 500px;
            opacity: .6;
            max-height: 500px;
          }
          .music-lineup {
            background: url('${conds ? allLivePages[0].musicLineup.url : ""}');
            background-size: contain;
            background-repeat: no-repeat;
          }
          .entertainment-lineup {
            background: url('${conds ? allLivePages[0].entertainmentLineup.url : ""}');
            background-size: contain;
            background-repeat: no-repeat;
          }
          .artist-lineup {
            background: url('${conds ? allLivePages[0].artistLineup.url : ""}');
            background-size: contain;
            background-repeat: no-repeat;
          }
        `}</style>
      </AppProvider>
    )
  }
}

export default withData(
  graphql(livePage)(LivePage)
)
