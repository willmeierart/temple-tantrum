import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
import withData from '../lib/withData'
import { allSponsors } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import Socials from '../components/Socials'
import DateModule from '../components/DateModule'

// include boilerplate for global loader dependent on graphql req's:
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sponsors: []
    }
  }

  componentDidUpdate (prevProps) {
    const sponsors = this.props.data.allSponsorses
    if (this.props.data) {
      if (sponsors !== prevProps.data.allSponsorses && sponsors.length > 0) {
        this.props.onSetSponsors(sponsors)
      }
    }
  }

  render () {
    console.log(this.props)
    return (
      <AppProvider sponsors={this.state.sponsors} {...this.props} title='Home'>
        <Head title='Home' />
        <section>
          <div className='socials-wrapper'>
            <Socials />
          </div>
          <div className='date-wrapper'>
            <DateModule />
          </div>
          {/* <div className='img-wrapper'>
            <img src='/static/images/home_text.png' />
          </div> */}
          {/* {allThings1.loading || allThings2.loading ? (
            <div className='loader-wrapper'>
              <Loader type='line-spin-fade-loader' active />
            </div>
          ) : ( */}
          {/* )} */}
        </section>
        <style jsx>{`
          section {
            position: relative;
            height: 100vh;
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
            top: 30vh;
            right: 10vw;
            color: white;
          }
          .date-wrapper {
            position: absolute;
            width: 150px;
            left: 10vw;
            top: 30vw;
          }
            {/* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */}
        `}</style>
      </AppProvider>
    )
  }
}

// example of GraphQL with multiple queries composed:
export default withData(
  graphql(allSponsors)(HomePage)
)
